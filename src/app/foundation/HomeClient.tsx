// src/app/foundation/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  UtensilsCrossed,
  GraduationCap,
  HeartPulse,
  Users,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Camera,
  BadgeCheck,
  ChevronDown,
  HandHeart,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Eye,
  Activity,
  Share2,
  BookOpen,
  PawPrint,
  Sprout,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  Clock,
  MapPin
} from "lucide-react";

type CauseCategory = {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
};

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
};

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const slides = [
  { src: "/banner-healthcare.jpg", alt: "Healthcare outreach and wellness camp by Rakvih Foundation" },
  { src: "/banner-volunteers.jpg", alt: "Volunteers serving fresh meals and care packages with Rakvih Foundation" },
  { src: "/banner1.png", alt: "Community meal distribution by Rakvih Foundation" },
  { src: "/banner2.jpg", alt: "Children supported through Rakvih Foundation education programs" },
];

const passbook = [
  { label: "Meals Supported", value: "48,200+" },
  { label: "Active Volunteers", value: "10+" },
  { label: "Our Current Focus", value: "Bengaluru", highlight: "Grassroots" },
  { label: "Driven by", value: "100%", highlight: "Compassion" },
];

const focusAreasList = [
  {
    icon: UtensilsCrossed,
    emoji: "🍲",
    title: "Food & Hunger Relief",
    desc: "A meal can mean more than food. It can mean comfort, dignity and hope. We work to provide nutritious meals and essential food support to people and families who need it most.",
    cta: "Support Food Initiatives",
    href: "/foundation/causes?category=Food",
  },
  {
    icon: GraduationCap,
    emoji: "📚",
    title: "Education",
    desc: "Every child deserves the opportunity to learn, grow and dream. We support educational needs by helping provide learning materials, books, educational resources and opportunities for children.",
    cta: "Support Education",
    href: "/foundation/causes?category=Education",
  },
  {
    icon: HeartHandshake,
    emoji: "❤️",
    title: "Child & Vulnerable Community Support",
    desc: "Some people simply need someone to stand beside them. We support children and vulnerable individuals with essential resources, care and assistance that can help them move forward with dignity.",
    cta: "Support a Cause",
    href: "/foundation/causes?category=Child%20Support",
  },
  {
    icon: PawPrint,
    emoji: "🐾",
    title: "Animal Welfare",
    desc: "Compassion should have no boundaries. Our animal welfare initiatives aim to provide food, care and support to animals that depend on human kindness.",
    cta: "Support Animal Welfare",
    href: "/foundation/causes",
  },
  {
    icon: HeartPulse,
    emoji: "🏥",
    title: "Healthcare & Wellbeing",
    desc: "Good health should not be a privilege. We support healthcare and wellbeing initiatives designed to reach people and communities who need additional support.",
    cta: "Support Healthcare",
    href: "/foundation/causes",
  },
  {
    icon: Sprout,
    emoji: "🌱",
    title: "Community & Livelihood",
    desc: "Real change becomes sustainable when communities become stronger. We support initiatives that encourage self-reliance, opportunity and a better quality of life.",
    cta: "Support Communities",
    href: "/foundation/causes",
  },
];

const philosophySteps = [
  {
    step: "01",
    label: "IDENTIFY",
    icon: Eye,
    title: "Listen & Discover",
    text: "We listen to communities and understand where support is needed.",
  },
  {
    step: "02",
    label: "ACT",
    icon: Activity,
    title: "Turn Compassion to Action",
    text: "We turn compassion into practical initiatives.",
  },
  {
    step: "03",
    label: "IMPACT",
    icon: HeartPulse,
    title: "Deliver Measurable Outcomes",
    text: "We focus on creating meaningful outcomes for people, animals and communities.",
  },
  {
    step: "04",
    label: "SHARE",
    icon: Share2,
    title: "Keep You Connected",
    text: "We document our work and keep our supporters connected to the impact they help create.",
  },
];

const supportWays = [
  {
    title: "A Meal",
    text: "Can bring nourishment to someone who hasn't had enough to eat.",
    icon: UtensilsCrossed,
  },
  {
    title: "A Book",
    text: "Can become the beginning of a child's educational journey.",
    icon: BookOpen,
  },
  {
    title: "Essential Support",
    text: "Can bring dignity and relief during a difficult time.",
    icon: HandHeart,
  },
  {
    title: "Care for an Animal",
    text: "Can give a vulnerable animal food, safety and compassion.",
    icon: PawPrint,
  },
  {
    title: "An Opportunity",
    text: "Can help someone take one step towards a better future.",
    icon: Sparkles,
  },
];

const transparencyPillars = [
  {
    icon: BadgeCheck,
    title: "Real Work",
    text: "We focus on practical initiatives that address real needs within communities.",
  },
  {
    icon: Camera,
    title: "Impact Documentation",
    text: "We document our initiatives through photographs, videos and updates wherever appropriate.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Giving",
    text: "We strive to use every contribution responsibly and in line with the purpose for which it is given.",
  },
  {
    icon: Users,
    title: "Donor Connection",
    text: "We believe supporters should be able to see and understand the difference their involvement helps create.",
  },
];

const whyPoints = [
  "Because hunger is real.",
  "Because every child deserves an opportunity.",
  "Because vulnerable people deserve dignity.",
  "Because animals deserve compassion.",
  "Because communities deserve support.",
];

const testimonials = [
  {
    quote: "I don't give just because it feels good. I give because I want to know that my support is creating something meaningful.",
    author: "RAKVIH Supporter",
  },
  {
    quote: "Being part of RAKVIH has shown me that even a small effort can become something much bigger when people come together.",
    author: "RAKVIH Volunteer",
  },
  {
    quote: "The most meaningful part is seeing the impact directly and knowing that our contribution is helping someone.",
    author: "RAKVIH Donor",
  },
];

const faqs = [
  {
    q: "Who is RAKVIH Foundation?",
    a: "RAKVIH Foundation is a social-impact organisation committed to creating meaningful change through initiatives focused on food support, education, child welfare, animal care, healthcare and community development.",
  },
  {
    q: "What causes does RAKVIH Foundation support?",
    a: "Our focus areas include food and hunger relief, education, child and vulnerable community support, animal welfare, healthcare and community development.",
  },
  {
    q: "How can I support RAKVIH Foundation?",
    a: "You can support us by donating, volunteering, partnering with us, contributing your skills or helping us spread awareness about our work.",
  },
  {
    q: "How can I become a volunteer?",
    a: "You can register your interest through our volunteer form. Our team will connect with you regarding available opportunities.",
  },
  {
    q: "Can companies partner with RAKVIH Foundation?",
    a: "Yes. Organisations and CSR teams can partner with us to support eligible community initiatives.",
  },
  {
    q: "How do I know how my support creates impact?",
    a: "We believe in transparency and aim to document our initiatives through photographs, videos, updates and impact communication wherever appropriate.",
  },
  {
    q: "Can I support a specific cause?",
    a: "Yes. Where specific campaigns or causes are available, you can choose the initiative you would like to support.",
  },
  {
    q: "How can I contact RAKVIH Foundation?",
    a: "You can contact our team through the Contact Us page, email at rakvihfoundation@gmail.com, or call us at 82963 92047.",
  },
];

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

const viewportOnce = { once: true, margin: "-30px" };

type Props = {
  causes: CauseCategory[];
  gallery: GalleryItem[];
};

export default function HomeClient({ causes, gallery }: Props) {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const galleryPreview =
    gallery.length > 0
      ? gallery
      : slides.map((s, i) => ({ id: i, title: s.alt, category: "General", image_url: s.src, created_at: "" }));

  return (
    <div
      className={`min-h-screen overflow-x-clip bg-[#F8FAF0] text-[#1C2410] dark:bg-black dark:text-slate-100 ${display.variable} ${body.variable}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ============ 01. HERO SECTION ============ */}
      <section className="relative h-[calc(100vh-76px)] sm:h-[calc(100vh-94px)] min-h-[580px] max-h-[820px] w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center sm:object-[center_35%]"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/55" />

        <div className="relative z-10 flex h-full max-w-7xl flex-col justify-end items-start mx-auto px-4 pb-14 sm:pb-16 lg:pb-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107] backdrop-blur-md shadow-sm"
          >
            <Sparkles size={14} className="animate-pulse" />
            Make a difference. Change a life.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            It started with one simple thought —{" "}
            <span className="bg-gradient-to-r from-[#FFC107] via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              We Can Do More.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xs leading-relaxed text-white/90 sm:text-sm sm:leading-relaxed"
          >
            At RAKVIH Foundation, we believe that every act of kindness has the power to create meaningful change.
            From providing nutritious meals and supporting children&apos;s education to caring for animals, helping
            vulnerable communities and creating opportunities for a better future — we turn compassion into action.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-2 text-xs font-semibold text-[#FFC107]"
          >
            Every contribution. Every volunteer. Every helping hand. Together, we can do more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-3.5"
          >
            <Link
              href="/foundation/donate"
              className="inline-flex items-center gap-2 rounded-full bg-[#798321] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition hover:bg-[#647019] sm:text-sm"
            >
              Donate Now <ArrowRight size={16} />
            </Link>
            <Link
              href="/foundation/volunteer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-sm"
            >
              Join Our Mission
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/75"
          >
            {["Food", "Education", "Child Welfare", "Animal Care", "Healthcare", "Community Development"].map(
              (pillar, idx) => (
                <span key={pillar} className="flex items-center gap-2">
                  {pillar}
                  {idx !== 5 && <span className="text-[#FFC107]">•</span>}
                </span>
              )
            )}
          </motion.div>

          <div className="mt-8 flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-[#FFC107]" : "w-3 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 02. IMPACT STRIP ============ */}
      <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:px-10 sm:py-8"
        >
          <div className="mb-5 flex flex-col items-center justify-center border-b border-dashed border-slate-200 pb-3 text-center dark:border-zinc-800">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              Together, We Are Making a Difference
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {passbook.map((row, i) => (
              <motion.div
                key={row.label}
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-2xl font-extrabold text-[#798321] dark:text-[#FFC107] sm:text-3xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {row.value}
                  </span>
                </div>
                <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                  {row.label}
                </span>
                {row.highlight && (
                  <span className="mt-1.5 inline-flex items-center rounded-full bg-[#798321]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                    {row.highlight}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============ 03. FOUNDATION INTRODUCTION ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/banner9.png"
              alt="Rakvih Foundation volunteers in action"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              It started with one simple thought — We Can Do More.
            </span>
            <h2
              className="mt-3 text-2xl font-bold leading-tight text-[#1C2410] dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We don&apos;t have to change the whole world to make a difference. We just have to start somewhere.
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
              Every day, people around us face challenges that can feel overwhelming — hunger, lack of educational
              opportunities, vulnerability, poor access to essential support, and the need for compassion and care.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm font-semibold">
              We believe these challenges deserve more than sympathy. They deserve action.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
              RAKVIH Foundation works to bring people together to support individuals, children, families, animals and
              communities through meaningful initiatives that create real-world impact.
            </p>
            <div className="mt-4 flex items-center gap-3 font-bold text-[#798321] dark:text-[#FFC107] text-sm">
              <span>We care.</span>
              <span>•</span>
              <span>We act.</span>
              <span>•</span>
              <span>We create impact.</span>
            </div>
            <Link
              href="/foundation/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#798321] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black dark:hover:bg-yellow-400"
            >
              Learn Our Story <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============ 04. OUR FOCUS AREAS ============ */}
      <section className="bg-white py-16 dark:bg-zinc-950 overflow-hidden border-y border-slate-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-2xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              Our Focus Areas
            </span>
            <h2
              className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where Compassion Becomes Action
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Our work is driven by the needs we see around us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreasList.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Link
                    href={area.href}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-[#F8FAF0] p-6 shadow-sm transition-all duration-300 hover:border-[#798321]/50 hover:shadow-lg hover:shadow-[#798321]/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[#FFC107]/50 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] transition-transform duration-300 group-hover:scale-110 dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                          <Icon size={22} />
                        </div>
                        <span className="text-xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{area.emoji}</span>
                      </div>
                      <h3
                        className="mt-4 text-base font-bold text-[#1C2410] transition-colors group-hover:text-[#798321] dark:text-white dark:group-hover:text-[#FFC107]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {area.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {area.desc}
                      </p>
                    </div>
                    <div
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#798321] transition-all group-hover:gap-2.5 dark:text-[#FFC107]"
                    >
                      {area.cta} <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 05. OUR PHILOSOPHY ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
            Our Philosophy
          </span>
          <h2
            className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We don&apos;t just want to help. We want to create impact.
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
            We believe meaningful social work begins with understanding a need and ends with creating a measurable difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophySteps.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#798321]/20 dark:text-[#FFC107]/20">
                      {p.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                      <Icon size={20} />
                    </div>
                  </div>
                  <span className="mt-3 block text-xs font-extrabold uppercase tracking-widest text-[#798321] dark:text-[#FFC107]">
                    {p.label}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-[#1C2410] dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-dashed border-[#798321]/30 bg-[#798321]/5 p-5 text-center dark:border-[#FFC107]/30 dark:bg-[#FFC107]/5"
        >
          <p className="text-xs font-semibold text-[#1C2410] dark:text-white sm:text-sm">
            Because your support deserves more than a thank-you. It deserves a story of change.
          </p>
        </motion.div>
      </section>

      {/* ============ 06. HOW YOUR SUPPORT MAKES A DIFFERENCE ============ */}
      <section className="bg-white py-16 dark:bg-zinc-950 overflow-hidden border-t border-slate-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              How Your Support Makes a Difference
            </span>
            <h2
              className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your kindness can become someone&apos;s hope.
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              A contribution may seem small to one person. But to someone who needs it, it can mean everything.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {supportWays.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAF0] p-5 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-[#1C2410] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/foundation/donate"
              className="inline-flex items-center gap-2 rounded-full bg-[#798321] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black dark:hover:bg-yellow-400 sm:text-sm"
            >
              Make a Difference Today <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 07. TRANSPARENCY ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
            Transparency
          </span>
          <h2
            className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your trust matters to us.
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
            We believe giving should come with trust, responsibility and transparency. When you support RAKVIH Foundation,
            we want you to understand the work your contribution helps make possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transparencyPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#1C2410] dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/foundation/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            View Our Impact <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* ============ 08. RESTORED FIELD GALLERY SECTION ============ */}
      <section className="bg-white py-14 dark:bg-zinc-950 overflow-hidden border-t border-slate-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
                On the ground
              </span>
              <h2
                className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Recent moments from the field
              </h2>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/foundation/gallery"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#798321] hover:underline dark:text-[#FFC107]"
              >
                View full gallery <ArrowUpRight size={15} />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6"
          >
            {galleryPreview.slice(0, 12).map((item, i) => (
              <motion.div
                key={item.id}
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -3 }}
                className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800"
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 09 & 10. ATTACHED CARD: VOLUNTEER & CORPORATE CSR ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-2 shadow-2xl border border-slate-200 dark:border-zinc-800"
        >
          {/* Volunteer Half */}
          <div className="relative flex flex-col items-start justify-between bg-[#798321] p-8 sm:p-12 text-white">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-xl" />
            <div className="relative z-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <HandHeart size={24} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC107]">
                09. Our Volunteers
              </span>
              <h2
                className="mt-2 text-2xl font-bold sm:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                You don&apos;t have to do everything. Just do something.
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-white/90 sm:text-sm">
                Change is never created by one person alone. It happens when people come together with a shared belief that{" "}
                <strong>we can do more</strong>.
              </p>

              {/* Tag Pills */}
              <div className="my-4 flex flex-wrap gap-1.5 text-[11px] font-bold uppercase tracking-wider">
                {["Time", "Skills", "Ideas", "Resources", "Compassion"].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-white border border-white/15">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs leading-relaxed text-white/80">
                Whether you want to participate in community initiatives, support events, help with education, assist animals,
                contribute your professional skills or simply lend a helping hand — there is a place for you at RAKVIH Foundation.
              </p>
              <p className="mt-3 text-xs font-bold text-[#FFC107]">
                Become a part of something meaningful.
              </p>
            </div>
            
            <div className="relative z-10 mt-8">
              <Link
                href="/foundation/volunteer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-xl transition hover:bg-yellow-400 hover:text-black sm:text-sm"
              >
                Become a Volunteer <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Corporate / CSR Half */}
          <div className="relative flex flex-col items-start justify-between bg-[#1C2410] p-8 sm:p-12 text-white">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[#FFC107]/10 blur-xl" />
            <div className="relative z-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[#FFC107]">
                <Users size={24} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC107]">
                10. Corporate / CSR
              </span>
              <h2
                className="mt-2 text-2xl font-bold sm:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Together, We Can Create Greater Impact
              </h2>
              <p className="mt-2 text-xs font-semibold text-[#FFC107] sm:text-sm">
                Partner With RAKVIH Foundation
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                Businesses have the power to create meaningful change beyond the workplace. We welcome organisations and CSR teams that want to contribute to initiatives focused on:
              </p>

              {/* Grid of CSR Focus Items */}
              <div className="my-4 grid grid-cols-2 gap-2 text-xs font-semibold text-white/90">
                {[
                  "Food & Nutrition",
                  "Education",
                  "Child Welfare",
                  "Healthcare",
                  "Animal Welfare",
                  "Community Development",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 size={13} className="text-[#FFC107] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs leading-relaxed text-white/70">
                Together, we can turn corporate responsibility into community impact. Let&apos;s build something that matters.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              <Link
                href="/foundation/csr"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-xl transition hover:bg-yellow-400 hover:text-black sm:text-sm"
              >
                Become a CSR Partner <ArrowRight size={16} />
              </Link>
              <Link
                href="/foundation/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-sm"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ 11. WHY RAKVIH FOUNDATION ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              Why RAKVIH Foundation
            </span>
            <h2
              className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why We Do What We Do
            </h2>

            <div className="mt-6 space-y-3">
              {whyPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#798321]/15 text-[#798321] dark:bg-[#FFC107]/15 dark:text-[#FFC107]">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 sm:text-sm">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm italic">
              And because we believe that waiting for someone else to make a difference is not enough. Sometimes, we have to be the ones who begin.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg"
          >
            <Image
              src="/banner4.png"
              alt="Rakvih Foundation field team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ============ 12. DONOR CTA ============ */}
      <section className="bg-white py-16 dark:bg-zinc-950 overflow-hidden border-t border-slate-200 dark:border-zinc-800 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              Donor Call to Action
            </span>
            <h2
              className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your support can start a change.
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
              You don&apos;t need to give everything. You don&apos;t need to solve every problem. You just need to start.
              Your contribution can help provide food, education, care, support and opportunities to people and communities who need them.
            </p>

            <div className="mt-5 flex justify-center gap-4 text-xs font-bold text-[#798321] dark:text-[#FFC107]">
              <span>One contribution.</span>
              <span>•</span>
              <span>One helping hand.</span>
              <span>•</span>
              <span>One life touched.</span>
            </div>

            <div className="mt-6">
              <Link
                href="/foundation/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[#798321] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition hover:bg-[#647019] dark:bg-[#FFC107] dark:text-black dark:hover:bg-yellow-400 sm:text-sm"
              >
                Donate Now <Heart size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 13. TESTIMONIAL SECTION ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
            Testimonials
          </span>
          <h2
            className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Our Supporters Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <Quote className="mb-4 text-[#798321]/30 dark:text-[#FFC107]/30" size={28} />
                <p className="text-xs leading-relaxed italic text-slate-700 dark:text-slate-300 sm:text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#798321] dark:text-[#FFC107]">
                — {t.author}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ 14. FAQ & PROPORTIONAL COMPACT SUPPORT CARD ============ */}
      <section className="bg-white py-16 dark:bg-zinc-950 overflow-hidden border-t border-slate-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#798321] dark:text-[#FFC107]">
              FAQ
            </span>
            <h2
              className="mt-2 text-3xl font-bold text-[#1C2410] dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
              Got questions? We believe in 100% honesty, transparency, and straightforward answers.
            </p>
          </div>

          <div className="mx-auto max-w-6xl grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6">
            
            {/* Left Column: Equal Matching FAQ Card */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
              className="flex flex-col rounded-3xl border border-slate-200 bg-[#F8FAF0] p-5 sm:p-6 lg:p-7 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm space-y-4"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2.5 self-start">
                  <HelpCircle size={13} /> Common Questions
                </div>
                <h3
                  className="text-lg font-bold text-[#1C2410] dark:text-white sm:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Quick Answers
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Transparent details on our work, fund utilization, and community initiatives.
                </p>
              </div>

              <div className="space-y-2">
                {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={faq.q}
                      className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-950/60"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900/50"
                      >
                        <span className="text-xs font-bold text-[#1C2410] dark:text-white">
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`shrink-0 text-[#798321] transition-transform duration-300 dark:text-[#FFC107] ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-slate-100 px-4 pt-2 pb-3 text-xs leading-relaxed text-slate-600 dark:border-zinc-800/80 dark:text-slate-400">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Toggle more FAQs button */}
              <div className="flex items-center justify-between pt-1 text-xs border-t border-slate-200/80 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="inline-flex items-center gap-1.5 font-bold text-[#798321] hover:underline dark:text-[#FFC107] pt-1"
                >
                  {showAllFaqs ? "Show fewer questions" : `View all ${faqs.length} questions (${faqs.length - 5} more)`}
                </button>
                <Link
                  href="/foundation/about"
                  className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white inline-flex items-center gap-1 font-medium pt-1"
                >
                  Policy <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Dedicated Support Card */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
              className="flex flex-col rounded-3xl border border-slate-200 bg-[#F8FAF0] p-5 sm:p-6 lg:p-7 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm space-y-3.5 h-fit lg:sticky lg:top-24"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2.5 self-start">
                  <Phone size={12} /> Dedicated Helpdesk
                </div>
                
                <h3
                  className="text-lg font-bold text-[#1C2410] dark:text-white sm:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Still have questions? We&apos;re here.
                </h3>
                
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Connect directly with our team regarding 80G tax receipts, custom drives, volunteering, or visits.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-2.5">
                <a
                  href="tel:+918296392047"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 transition-all hover:border-[#798321] hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-[#FFC107]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black">
                    <Phone size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Helpline</span>
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Mon–Sat 9AM–7PM</span>
                    </div>
                    <span className="text-xs font-bold text-[#1C2410] dark:text-white sm:text-sm">+91 82963 92047</span>
                  </div>
                </a>

                <a
                  href="mailto:rakvihfoundation@gmail.com"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 transition-all hover:border-[#798321] hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-[#FFC107]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Inquiry</span>
                      <span className="text-[10px] font-medium text-slate-400">Replies &lt; 2 hrs</span>
                    </div>
                    <span className="text-xs font-bold text-[#1C2410] dark:text-white sm:text-sm truncate block">rakvihfoundation@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950/60">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                    <MapPin size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Grassroots Center</span>
                    <span className="text-xs font-bold text-[#1C2410] dark:text-white">Yelahanka, Bangalore, Karnataka 560064, India</span>
                  </div>
                </div>

                {/* 80G Tax Exemption Note */}
                <div className="flex items-center gap-3 rounded-2xl border border-[#798321]/20 bg-[#798321]/5 p-3 dark:border-[#FFC107]/20 dark:bg-[#FFC107]/5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#798321]/15 text-[#798321] dark:bg-[#FFC107]/15 dark:text-[#FFC107]">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:text-[#FFC107]">80G Tax Exemption</span>
                    <span className="text-[11px] leading-tight text-slate-600 dark:text-slate-400 block">Instant tax deduction receipt with every donation</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://wa.me/918296392047"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-95 hover:shadow-md"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <Link
                  href="/foundation/contact"
                  className="flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-slate-100 hover:border-slate-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800"
                >
                  Contact Page <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============ 15. FINAL EMOTIONAL CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#24310F] via-[#2F3E14] to-[#798321] p-8 sm:p-14 text-center text-white shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#FFC107]/20 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Make a Difference
            </span>
            <h2
              className="mt-2 text-2xl font-extrabold sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              It started with one simple thought —{" "}
              <span className="text-[#FFC107]">We Can Do More.</span>
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-slate-200">
              We believe change doesn&apos;t always begin with something big. Sometimes it begins with:
            </p>

            <div className="my-6 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
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
                  className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-white/15"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-sm sm:text-base font-extrabold text-white">
              And when thousands of people choose to care together —{" "}
              <span className="text-[#FFC107]">WE CAN DO MORE.</span>
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
                Join Our Mission
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}