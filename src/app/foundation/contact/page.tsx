"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Users,
  Loader2,
  Heart,
  HandHeart,
  Building2,
  HelpCircle,
  ExternalLink
} from "lucide-react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  variable: "--font-display",
});

const SEO_TITLE = "Contact RAKVIH Foundation | Bengaluru NGO — Let's Make a Difference Together";
const SEO_DESCRIPTION =
  "Contact RAKVIH Foundation in Yelahanka, Bangalore. Connect with our team for donations, volunteering, CSR partnerships, or cause inquiries. Call 82963 92047 or email rakvihfoundation@gmail.com.";
const CANONICAL_URL = "https://www.rakvihfoundation.org.in/foundation/contact";

// ── 6 Inquiry Categories Specified by User ──
const inquiryOptions = [
  {
    id: "Donation & Support",
    title: "Donation & Support",
    desc: "Questions about donating or supporting our initiatives.",
    icon: Heart,
  },
  {
    id: "Volunteer With Us",
    title: "Volunteer With Us",
    desc: "Interested in contributing your time, skills or ideas?",
    icon: HandHeart,
  },
  {
    id: "CSR / Corporate Partnership",
    title: "CSR / Corporate Partnership",
    desc: "Looking to create meaningful social impact through your organisation?",
    icon: Building2,
  },
  {
    id: "Cause / Campaign Enquiry",
    title: "Cause / Campaign Enquiry",
    desc: "Want to know more about a particular initiative or campaign?",
    icon: HelpCircle,
  },
  {
    id: "Media & Press",
    title: "Media & Press",
    desc: "Media enquiries, interviews and collaboration requests.",
    icon: MessageCircle,
  },
  {
    id: "General Enquiry",
    title: "General Enquiry",
    desc: "For any other questions or information.",
    icon: Sparkles,
  },
];

// ── 3 Value Pillars (We're Here to Help) ──
const valuePillars = [
  {
    icon: HeartHandshake,
    title: "Meaningful Impact",
    desc: "We work to turn compassion into practical action that creates meaningful impact for people, animals and communities.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    desc: "We believe our supporters deserve to understand the work their support helps make possible.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Our work grows through the support of donors, volunteers, partners and people who believe that together, we can do more.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeReason, setActiveReason] = useState(inquiryOptions[0].id);
  const [consentGiven, setConsentGiven] = useState(true);

  // Form Fields
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    document.title = SEO_TITLE;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", SEO_DESCRIPTION);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", CANONICAL_URL);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setErrorMessage("Please agree to the privacy consent to proceed.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry_type: activeReason,
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-[100dvh] w-full overflow-x-clip bg-[#F8FAF0] text-slate-900 dark:bg-black dark:text-slate-100 ${display.variable}`}>
      
      {/* ============ 01. HERO & SUMMARY BANNER ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#24310F] via-[#2F3E14] to-[#1C2410] pt-12 pb-16 text-white sm:pt-16 sm:pb-20">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#798321]/30 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute top-10 right-1/4 h-80 w-80 rounded-full bg-[#FFC107]/20 blur-[120px]"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107] backdrop-blur-md shadow-lg"
          >
            <Sparkles size={14} className="animate-pulse" />
            Let&apos;s Make a Difference Together
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We&apos;d Love to Hear From You.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-amber-100 sm:text-base"
          >
            RAKVIH Foundation is committed to creating meaningful social impact through food support, education, child welfare, animal care, healthcare and community development.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-300"
          >
            Have a question about our work? Want to volunteer your time? Interested in supporting a cause or exploring a CSR partnership? Whatever brings you here, we&apos;re glad you&apos;re taking the time to connect with us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 inline-block rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-sm"
          >
            <p className="text-xs sm:text-sm font-semibold text-white">
              At RAKVIH Foundation, we believe meaningful change begins when people come together with a common purpose.
            </p>
            <p className="mt-1 text-xs font-bold text-[#FFC107]">
              It started with one simple thought — We Can Do More.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ 02. WE'RE HERE TO HELP (3 VALUE PILLARS) ============ */}
      <section className="relative z-10 -mt-8 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {valuePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                    <Icon size={24} />
                  </div>
                  <h3
                    className="mt-4 text-base font-bold text-[#1C2410] dark:text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============ 03. HOW CAN WE HELP YOU? (INTERACTIVE INQUIRY SELECTOR) ============ */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
            How Can We Help You?
          </span>
          <h2
            className="mt-2 text-2xl sm:text-3xl font-bold text-[#1C2410] dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose the reason for your enquiry
          </h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
            Select an option below to tailor your message so our team can get back to you quickly with the right information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {inquiryOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeReason === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => setActiveReason(opt.id)}
                className={`group flex items-start gap-3.5 rounded-2xl p-4 text-left transition-all cursor-pointer border ${
                  isSelected
                    ? "border-[#798321] bg-[#798321]/10 dark:border-[#FFC107] dark:bg-[#FFC107]/10 shadow-sm ring-1 ring-[#798321] dark:ring-[#FFC107]"
                    : "border-slate-200 bg-white hover:border-[#798321]/40 dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? "bg-[#798321] text-white dark:bg-[#FFC107] dark:text-black"
                      : "bg-[#798321]/10 text-[#798321] group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C2410] dark:text-white">
                    {opt.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============ 04. SEND US A MESSAGE & OFFICIAL HELPDESK ============ */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* LEFT: Official Helpdesk Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 space-y-4 lg:sticky lg:top-24"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2 self-start">
                <Phone size={12} /> Official Helpdesk
              </div>
              <h3
                className="text-xl font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                We&apos;re Here to Help
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Whether you want to support our initiatives, volunteer, partner with us or simply learn more about RAKVIH Foundation, our team is here to assist you.
              </p>
            </div>

            {/* Contact Rows */}
            <div className="space-y-3">
              <a
                href="tel:+918296392047"
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-[#F8FAF0] p-3.5 transition-all hover:border-[#798321] hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-[#FFC107]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black">
                  <Phone size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Call Helpline
                  </span>
                  <span className="text-sm font-bold text-[#1C2410] dark:text-white">
                    82963 92047
                  </span>
                </div>
              </a>

              <a
                href="mailto:rakvihfoundation@gmail.com"
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-[#F8FAF0] p-3.5 transition-all hover:border-[#798321] hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-[#FFC107]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black">
                  <Mail size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email Inquiry
                  </span>
                  <span className="text-sm font-bold text-[#1C2410] dark:text-white truncate block">
                    rakvihfoundation@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-[#F8FAF0] p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                  <MapPin size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Registered Office
                  </span>
                  <span className="text-xs font-bold text-[#1C2410] dark:text-white block">
                    RAKVIH FOUNDATION
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5">
                    Yelahanka, Bangalore, Karnataka 560064, India
                  </span>
                  <span className="mt-1.5 block text-[11px] font-medium text-amber-700 dark:text-amber-400">
                    * For scheduled visits or meetings, please contact our team in advance.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-[#F8FAF0] p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                  <Clock size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Response Window
                  </span>
                  <span className="text-xs font-semibold text-[#1C2410] dark:text-white">
                    Direct reply within 24–48 hours
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Chat */}
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-800">
              <a
                href="https://wa.me/918296392047"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-xs font-bold text-white shadow-sm transition hover:opacity-95"
              >
                <MessageCircle size={16} /> Chat Instantly on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Send Us a Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
                Send Us a Message
              </span>
              <h3
                className="mt-1 text-2xl font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                We&apos;d Be Happy to Hear From You.
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Please fill in the form details below and our team will get in touch with you shortly.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#24310F] dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Thank you for reaching out to RAKVIH Foundation. Our team has received your message and will review it promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ full_name: "", phone: "", email: "", message: "" });
                  }}
                  className="mt-6 rounded-full bg-[#798321] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="rounded-2xl bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 text-center font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Inquiry Selection (Reflects Active Category) */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                    How Can We Help You? (Inquiry Reason)
                  </label>
                  <select
                    value={activeReason}
                    onChange={(e) => setActiveReason(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs text-slate-900 outline-none ring-[#798321]/30 transition focus:bg-white focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-900 dark:focus:text-white dark:focus:border-[#FFC107] dark:focus:ring-[#FFC107]/20"
                  >
                    {inquiryOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="dark:bg-zinc-900 dark:text-white">
                        {opt.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                      Full Name *
                    </label>
                    <input
                      required
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-900 outline-none ring-[#798321]/30 transition focus:bg-white focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-900 dark:focus:text-white dark:focus:border-[#FFC107] dark:focus:ring-[#FFC107]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                      Phone Number *
                    </label>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 82963 92047"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-900 outline-none ring-[#798321]/30 transition focus:bg-white focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-900 dark:focus:text-white dark:focus:border-[#FFC107] dark:focus:ring-[#FFC107]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-900 outline-none ring-[#798321]/30 transition focus:bg-white focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-900 dark:focus:text-white dark:focus:border-[#FFC107] dark:focus:ring-[#FFC107]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please write the details of your inquiry or message here..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-900 outline-none ring-[#798321]/30 transition focus:bg-white focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-900 dark:focus:text-white dark:focus:border-[#FFC107] dark:focus:ring-[#FFC107]/20"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#798321] focus:ring-[#798321] dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <label htmlFor="consent" className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                    I agree to RAKVIH Foundation using the information provided to respond to my enquiry. Please review our{" "}
                    <Link href="/foundation/privacy-policy" className="font-semibold text-[#798321] underline hover:text-[#647019] dark:text-[#FFC107]">
                      Privacy Policy
                    </Link>{" "}
                    to understand how your information is handled.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !consentGiven}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#798321] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black dark:hover:bg-yellow-400 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============ 05. 3 WAYS TO ENGAGE TODAY (DONATE / VOLUNTEER / CSR) ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Card 1: WANT TO MAKE A DIFFERENCE TODAY? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                <Heart size={20} />
              </div>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:text-[#FFC107]">
                Want to Make a Difference Today?
              </span>
              <h3
                className="mt-1 text-lg font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your Support Can Become Someone&apos;s Hope.
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                You don&apos;t have to solve every problem. Sometimes, making a difference begins with one small action. Your support can help us create meaningful initiatives across food support, education, child welfare, animal care, healthcare and community development.
              </p>
            </div>
            <Link
              href="/foundation/donate"
              className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#798321] py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black dark:hover:bg-yellow-400 dark:hover:text-black"
            >
              Donate Now <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Card 2: YOUR TIME CAN MAKE A DIFFERENCE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                <HandHeart size={20} />
              </div>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:text-[#FFC107]">
                Your Time Can Make a Difference
              </span>
              <h3
                className="mt-1 text-lg font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Become a RAKVIH Volunteer.
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                You don&apos;t have to donate money to create change. Your time, skills, ideas and compassion can help us reach more people, support more initiatives and create greater impact. Whether you want to participate in an event, support education or community activities — there is a place for you.
              </p>
            </div>
            <Link
              href="/foundation/volunteer"
              className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white dark:hover:border-zinc-600"
            >
              Become a Volunteer <ArrowRight size={13} />
            </Link>
          </motion.div>

          {/* Card 3: LET'S CREATE GREATER IMPACT TOGETHER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                <Building2 size={20} />
              </div>
              <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:text-[#FFC107]">
                Let&apos;s Create Greater Impact Together
              </span>
              <h3
                className="mt-1 text-lg font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Corporate &amp; CSR Partnerships
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Businesses and organisations have the opportunity to create meaningful change beyond the workplace. RAKVIH Foundation welcomes organisations interested in supporting initiatives across: <strong>Food &amp; Nutrition • Education • Child Welfare • Healthcare • Animal Welfare • Community Development</strong>.
              </p>
            </div>
            <Link
              href="/foundation/csr"
              className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800 dark:hover:text-white dark:hover:border-zinc-600"
            >
              CSR Partnerships <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ 06. FIND US & HAVE A QUESTION? (PROPERLY BALANCED, NO MAP) ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Registered Office & Center (Find Us) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-3 self-start">
                <MapPin size={13} /> Registered Office
              </div>
              <h3
                className="text-2xl font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                RAKVIH FOUNDATION
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Yelahanka, Bangalore, Karnataka 560064, India
              </p>

              <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 text-xs dark:border-amber-900/30 dark:bg-amber-950/20">
                <p className="font-semibold text-amber-900 dark:text-amber-300">
                  Scheduled Visits &amp; Community Meetings
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                  For scheduled visits, volunteering briefings, or in-person CSR meetings, please contact our team in advance so our volunteers and staff can welcome you.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Yelahanka+Bangalore+Karnataka+560064+India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#798321] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black"
              >
                Open in Google Maps <ExternalLink size={13} />
              </a>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Bangalore Grassroots Center
              </span>
            </div>
          </motion.div>

          {/* Card 2: Have a Question? We're Just a Message Away */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-3 self-start">
                <HelpCircle size={13} /> Direct Reach
              </div>
              <h3
                className="text-2xl font-bold text-[#1C2410] dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                We&apos;re Just a Message Away.
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Whether you&apos;re a donor, volunteer, organisation, community member or someone looking to support a cause — we&apos;d love to hear from you.
              </p>

              <div className="mt-4 space-y-2.5">
                <a
                  href="tel:+918296392047"
                  className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-[#F8FAF0] p-3.5 transition hover:border-[#798321] dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Helpline</span>
                    <span className="text-xs font-bold text-[#1C2410] dark:text-white sm:text-sm">+91 82963 92047</span>
                  </div>
                </a>

                <a
                  href="mailto:rakvihfoundation@gmail.com"
                  className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-[#F8FAF0] p-3.5 transition hover:border-[#798321] dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Inquiry</span>
                    <span className="text-xs font-bold text-[#1C2410] dark:text-white sm:text-sm truncate block">rakvihfoundation@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href="https://wa.me/918296392047"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
              >
                <MessageCircle size={15} /> Chat on WhatsApp
              </a>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Mon – Sat, 9:00 AM – 7:00 PM
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ============ 07. FINAL CALL TO ACTION ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#24310F] via-[#2F3E14] to-[#798321] p-8 sm:p-12 text-center text-white shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#FFC107]/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Make a Difference.
            </span>
            <h2
              className="mt-2 text-2xl font-extrabold sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              It started with one simple thought —{" "}
              <span className="text-[#FFC107]">WE CAN DO MORE.</span>
            </h2>

            {/* Micro Pillars / Items */}
            <div className="my-6 flex flex-wrap justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold">
              {[
                "One meal.",
                "One book.",
                "One helping hand.",
                "One volunteer.",
                "One contribution.",
                "One person choosing to care.",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/15 px-3.5 py-1.5 backdrop-blur-sm border border-white/15"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-200">
              And when we choose to care together, we can create something bigger than ourselves.
            </p>

            <p className="mt-3 text-sm sm:text-base font-extrabold text-[#FFC107] tracking-wider uppercase">
              Make a difference. Change a life.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/foundation/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-xl transition hover:bg-yellow-400 hover:text-black sm:text-sm"
              >
                Donate Now <Heart size={16} />
              </Link>
              <Link
                href="/foundation/volunteer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-sm"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}