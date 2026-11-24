import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";

const maxProofSize = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > maxProofSize + 65536) {
    return Response.json({ error: "Use a screenshot smaller than 4 MB." }, { status: 413 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return Response.json({ error: "Could not read the payment proof." }, { status: 400 });
  }

  const field = (name: string) => String(form.get(name) ?? "").trim();
  const fullName = field("fullName");
  const email = field("email");
  const phone = field("phone");
  const amount = Number(field("amount"));
  const category = field("category");
  const date = field("date");
  const reference = field("reference");
  const message = field("message");
  const proof = form.get("proof");

  if (
    !fullName || fullName.length > 120 ||
    !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 ||
    !/^[+\d ()-]{7,24}$/.test(phone) || phone.replace(/\D/g, "").length < 7 ||
    !Number.isFinite(amount) || amount < 1 || amount > 10_000_000 ||
    Math.abs(amount * 100 - Math.round(amount * 100)) > 0.00001 ||
    !category || category.length > 80 || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !/^[a-zA-Z0-9-]{4,80}$/.test(reference) || message.length > 1000 ||
    !(proof instanceof File) || proof.size === 0 || proof.size > maxProofSize
  ) {
    return Response.json({ error: "Check your contribution details, transaction reference, and screenshot size." }, { status: 400 });
  }

  const header = Buffer.from(await proof.slice(0, 12).arrayBuffer());
  const isPng = header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const isJpeg = header.subarray(0, 3).equals(Buffer.from([255, 216, 255]));
  if (!isPng && !isJpeg) {
    return Response.json({ error: "Attach a PNG or JPEG screenshot." }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return Response.json({ error: "Payment proof submission is temporarily unavailable." }, { status: 503 });
  }

  const path = `general-fund/${randomUUID()}.${isPng ? "png" : "jpg"}`;
  const bucket = supabaseAdmin.storage.from("donation_proofs");
  const { error: uploadError } = await bucket.upload(path, proof, {
    contentType: isPng ? "image/png" : "image/jpeg",
  });
  if (uploadError) {
    console.error("General donation proof upload failed:", uploadError.message);
    return Response.json({ error: "Could not upload your screenshot. Please try again." }, { status: 502 });
  }

  const { error: insertError } = await supabaseAdmin.from("foundation_donations").insert({
    full_name: fullName,
    email,
    phone,
    referral_name: "",
    amount,
    purpose: [category, `Contribution date ${date}`, `Transaction reference ${reference}`, message].filter(Boolean).join(" · "),
    payment_proof_url: path,
    status: "pending",
  });

  if (insertError) {
    await bucket.remove([path]);
    console.error("General donation proof could not be recorded:", insertError.message);
    return Response.json({ error: "Could not submit your proof. Please try again." }, { status: 502 });
  }

  return Response.json({ status: "pending" }, { status: 201 });
}
