"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Fraunces } from "next/font/google";
import { Heart, Users, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import DonationPaymentDetails, { donationUpiId } from "@/components/foundation/DonationPaymentDetails";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  variable: "--font-display",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type RecentDonation = {
  id: string | number;
  donor_name: string;
  dedication_type: string | null;
  donation_date: string | null;
  message: string | null;
  amount: number | string;
};

export default function GeneralDonatePage() {
  const [donations, setDonations] = useState<RecentDonation[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [amount, setAmount] = useState<string>("500");
  const [donationDate, setDonationDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dedicationType, setDedicationType] = useState<string>("General Foundation Support");
  
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentPanel, setPaymentPanel] = useState<"payment" | "proof">("payment");
  const [reference, setReference] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [proofError, setProofError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const vName = localStorage.getItem("rakvih_volunteer_name");
      const vEmail = localStorage.getItem("rakvih_volunteer_email");
      if (vName) setDonorName((previous) => previous || vName);
      if (vEmail) setDonorEmail((previous) => previous || vEmail);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    async function fetchGeneralDonations() {
      try {
        setLoading(true);
        // Fetch donations where cause_id is null or 0 (general support)
        const { data: donationData } = await supabase
          .from("donations")
          .select("id, donor_name, dedication_type, donation_date, message, amount")
          .or("cause_id.is.null,cause_id.eq.0")
          .order("created_at", { ascending: false });

        if (donationData) {
          setDonations(donationData);
        }
      } catch (err) {
        console.error("Error loading donations:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGeneralDonations();
  }, []);

  async function submitProof(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !proof) return;

    setProofError("");
    if (proof.size > 4 * 1024 * 1024) {
      setProofError("Use a screenshot smaller than 4 MB.");
      return;
    }

    setSubmitting(true);
    try {
      const details = new FormData();
      Object.entries({
        fullName: donorName, email: donorEmail, phone: donorPhone, amount,
        category: dedicationType, date: donationDate, reference, message: donorMessage,
      }).forEach(([key, value]) => details.set(key, value));
      details.set("proof", proof);

      const response = await fetch("/api/donation/general-proof", { method: "POST", body: details });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Could not submit your proof. Please try again.");

      setSuccess(true);
      setReference("");
      setProof(null);
    } catch (error) {
      setProofError(error instanceof Error ? error.message : "Could not submit your proof. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`min-h-screen overflow-x-clip bg-slate-50 dark:bg-black pb-12 sm:pb-16 transition-colors duration-500 ${display.variable}`} style={{ fontFamily: "var(--font-display)" }}>
      
      {/* Header Section */}
      <section className="relative overflow-hidden pt-10 pb-6 sm:pt-14 sm:pb-8 bg-gradient-to-b from-[#24310F] via-[#2F3E14] to-[#F8FAF0] text-white dark:from-black dark:via-black dark:to-black">
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-2">
            Contribute to <span className="text-[#FFC107]">Our Foundation</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 dark:text-neutral-300 leading-relaxed">
            Your general contributions empower our core mission, community programs, and operational growth where it is needed most.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pt-5 sm:pt-7 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-[#0a0a0a]">
              <div className="relative h-64 w-full">
                <Image 
                  src="/don.jpeg" 
                  alt="Foundation Community Support" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">General Mission Fund</h2>
                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                  By making an open contribution to the RAKVIH Foundation, you provide us with the essential flexibility to allocate resources rapidly across various community welfare efforts, educational initiatives, and emergency relief programs.
                </p>
                
                <div className="flex items-center gap-3 rounded-2xl bg-amber-50 dark:bg-[#171717] p-4 border border-amber-200/60 dark:border-neutral-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#798321] text-white dark:bg-[#FFC107] dark:text-black">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-slate-500 dark:text-neutral-400">Impact Transparency</p>
                    <p className="text-sm font-extrabold text-[#798321] dark:text-[#FFC107]">100% Transparent Utilization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Supporters Section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0a0a0a]">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Heart size={18} className="text-rose-500" /> Recent Foundation Supporters ({donations.length})
              </h3>

              {loading ? (
                <div className="py-10 flex justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#798321] border-t-transparent dark:border-[#FFC107]" />
                </div>
              ) : donations.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-neutral-500 py-6 text-center">Be the first generous donor to support our general fund!</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {donations.map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#171717] border border-slate-100 dark:border-neutral-800 hover:border-[#798321]/40 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">{item.donor_name}</span>
                          {item.dedication_type && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#798321] dark:text-[#FFC107] bg-amber-50 dark:bg-[#0a0a0a] px-2 py-0.5 rounded-full border border-amber-200/50 dark:border-neutral-800">
                              <Tag size={10} /> {item.dedication_type}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-900/40">
                            <Calendar size={10} /> {item.donation_date || 'Recent'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 italic">&ldquo;{item.message || 'Supporting the foundation'}&rdquo;</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm font-extrabold text-[#798321] dark:text-[#FFC107]">₹{Number(item.amount).toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#0a0a0a]">
              <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Support General Fund</h2>
              <p className="mb-6 text-xs text-slate-500 dark:text-neutral-400">Choose an amount or enter your custom value to empower our mission.</p>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    setSuccess(false);
                    setPaymentPanel("payment");
                    setProofError("");
                    dialogRef.current?.showModal();
                  }} className="space-y-5">
                  
                  {/* Quick Preset Buttons */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300">Quick Select Amount (₹)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["200", "500", "1000", "2500", "5000", "10000"].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAmount(preset)}
                          className={`rounded-xl py-2.5 text-xs font-bold transition border ${
                            amount === preset
                              ? "bg-[#798321] text-white border-[#798321] dark:bg-[#FFC107] dark:text-black dark:border-[#FFC107] dark:hover:bg-yellow-400 dark:hover:text-black"
                              : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-[#171717] dark:text-neutral-300 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 dark:hover:text-white"
                          }`}
                        >
                          ₹{Number(preset).toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Editable Amount Input */}
                  <div>
                    <label htmlFor="donation-amount" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Custom Amount (₹)</label>
                    <input
                      id="donation-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="1"
                      max="10000000"
                      step="0.01"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white"
                    />
                  </div>

                  {/* Dedication Type Dropdown */}
                  <div>
                    <label htmlFor="donation-category" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Tag size={14} className="text-[#798321] dark:text-[#FFC107]" /> Contribution Category / Occasion
                    </label>
                    <select
                      id="donation-category"
                      value={dedicationType}
                      onChange={(e) => setDedicationType(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white"
                    >
                      <option value="General Foundation Support" className="dark:bg-[#171717]">General Foundation Support</option>
                      <option value="Birthday Celebration" className="dark:bg-[#171717]">Birthday Celebration</option>
                      <option value="Anniversary" className="dark:bg-[#171717]">Anniversary</option>
                      <option value="In Memory of a Loved One" className="dark:bg-[#171717]">In Memory of a Loved One</option>
                      <option value="Festival / Special Occasion" className="dark:bg-[#171717]">Festival / Special Occasion</option>
                    </select>
                  </div>

                  {/* Donation Date Picker */}
                  <div>
                    <label htmlFor="donation-date" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#798321] dark:text-[#FFC107]" /> Contribution Date
                    </label>
                    <input
                      id="donation-date"
                      type="date"
                      value={donationDate}
                      onChange={(e) => setDonationDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="donation-name" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Your Full Name *</label>
                    <input
                      id="donation-name"
                      type="text"
                      maxLength={120}
                      placeholder="e.g. Priya Sharma"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-medium text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="donation-email" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Email Address *</label>
                      <input
                        id="donation-email"
                        type="email"
                        maxLength={254}
                        placeholder="e.g. priya@example.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-medium text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="donation-phone" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Phone Number *</label>
                      <input
                        id="donation-phone"
                        type="tel"
                        minLength={7}
                        maxLength={24}
                        placeholder="e.g. +91 98765 43210"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-medium text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="donation-message" className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">Encouraging Message (Optional)</label>
                    <textarea
                      id="donation-message"
                      placeholder="Leave a warm word or note for our team..."
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      rows={3}
                      maxLength={1000}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-medium text-slate-800 focus:border-[#798321] focus:outline-none dark:border-neutral-800 dark:bg-[#171717] dark:text-white resize-none"
                    />
                  </div>

                  <button type="submit" className="w-full rounded-2xl bg-[#FFC107] px-4 py-3.5 text-sm font-bold text-black hover:bg-yellow-400">
                    Pay ₹{Number(amount || 0).toLocaleString("en-IN")}
                  </button>
                </form>
            </div>
          </div>

        </div>
      </main>

      <dialog
        ref={dialogRef}
        aria-labelledby="donation-payment-title"
        onCancel={(event) => { if (submitting) event.preventDefault(); }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl backdrop:bg-black/60 sm:p-6 dark:border-neutral-800 dark:bg-[#141414] dark:text-white"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="donation-payment-title" className="text-lg font-bold">
            {success ? "Payment proof submitted" : `Pay ₹${Number(amount || 0).toLocaleString("en-IN")}`}
          </h2>
          <button type="button" disabled={submitting} onClick={() => dialogRef.current?.close()} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm dark:border-neutral-700">
            Close
          </button>
        </div>
        {success ? (
          <p role="status" className="text-sm">Thank you. Your payment proof is pending verification by the Foundation.</p>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-2 gap-2 md:hidden" aria-label="Payment steps">
              {(["payment", "proof"] as const).map((panel) => (
                <button
                  key={panel}
                  type="button"
                  aria-pressed={paymentPanel === panel}
                  onClick={() => setPaymentPanel(panel)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold ${paymentPanel === panel
                    ? "border-[#FFC107] bg-[#FFC107]/15"
                    : "border-slate-200 dark:border-neutral-700"}`}
                >
                  {panel === "payment" ? "Payment details" : "Upload proof"}
                </button>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <div className={paymentPanel === "payment" ? "min-w-0" : "hidden min-w-0 md:block"}>
                <DonationPaymentDetails />
                <figure className="mt-3 flex flex-col items-center gap-2 text-center">
                  <Image
                    src="/images/foundation-kotak-upi-qr.png"
                    alt="Kotak UPI payment QR code for RAKVIH Foundation"
                    width={508}
                    height={508}
                    unoptimized
                    className="h-auto w-32 max-w-full rounded-lg md:w-40"
                  />
                  <figcaption className="text-sm text-slate-600 dark:text-neutral-300">
                    Scan with your UPI app and enter ₹{Number(amount).toLocaleString("en-IN")}.
                  </figcaption>
                </figure>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <a
                    href={`upi://pay?${new URLSearchParams({ pa: donationUpiId, pn: "RAKVIH FOUNDATION", am: Number(amount).toFixed(2), cu: "INR" })}`}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold dark:border-neutral-700"
                  >
                    Open UPI app
                  </a>
                  <button type="button" onClick={() => setPaymentPanel("proof")} className="rounded-lg bg-[#FFC107] px-3 py-2 text-sm font-bold text-black md:hidden">
                    Continue to proof
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="donation-proof-title"
                className={`min-w-0 rounded-2xl border border-slate-200 p-4 dark:border-neutral-800 sm:p-5 ${paymentPanel === "proof" ? "" : "hidden md:block"}`}
              >
                <h3 id="donation-proof-title" className="text-base font-bold">Upload payment proof</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-neutral-300">
                  After paying, enter your transaction reference and attach your screenshot.
                </p>
                <form onSubmit={submitProof} className="mt-4 space-y-4">
                  <label className="block text-sm font-semibold">
                    Transaction reference / UTR
                    <input required value={reference} onChange={(event) => setReference(event.target.value)} minLength={4} maxLength={80} disabled={submitting} className="mt-1 block w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-neutral-700" />
                  </label>
                  <label className="block text-sm font-semibold">
                    Payment screenshot (PNG or JPEG, up to 4 MB)
                    <input required type="file" accept="image/png,image/jpeg" onChange={(event) => setProof(event.target.files?.[0] ?? null)} disabled={submitting} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-neutral-700" />
                  </label>
                  {proofError && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{proofError}</p>}
                  <button type="submit" disabled={submitting} className="w-full rounded-xl bg-[#FFC107] px-4 py-3 text-sm font-bold text-black disabled:opacity-60">
                    {submitting ? "Submitting…" : "Submit payment proof"}
                  </button>
                </form>
              </section>
            </div>
          </>
        )}
      </dialog>

    </div>
  );
}
