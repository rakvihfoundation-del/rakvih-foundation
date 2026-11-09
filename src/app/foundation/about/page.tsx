"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Fraunces } from "next/font/google";
import Link from "next/link";
import {
  Heart,
  Utensils,
  Baby,
  GraduationCap,
  Calendar,
  Sparkles,
  ShieldCheck,
  Globe2,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  Landmark,
  Camera,
  FileCheck,
  Building2,
  Quote,
  HandHeart,
  Briefcase,
  Compass,
  Lightbulb,
  PawPrint,
  HeartHandshake,
  Search,
  Eye,
  Check,
} from "lucide-react";

// Setup matching website font
const display = Fraunces({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700", "800", "900"], 
  variable: "--font-display" 
});

// ── SEO copy ──
const SEO_TITLE =
  "About RAKVIH Foundation | Empowering Lives Through Compassion, Action & Purpose";
const SEO_DESCRIPTION =
  "RAKVIH Foundation is committed to creating a more compassionate, inclusive and empowered society through food support, education, child welfare, animal welfare, and livelihood assistance.";
const CANONICAL_URL = "https://www.rakvihfoundation.org.in/foundation/about";

// ── NGO / NonProfit schema ──
const ngoSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "RAKVIH Foundation",
  url: "https://www.rakvihfoundation.org.in/foundation",
  description:
    "RAKVIH Foundation is a registered non-profit working across India to alleviate hunger and uplift communities through food, education, healthcare and livelihood programmes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Yelahanka",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560064",
    addressCountry: "India",
  },
  areaServed: "IN",
  knowsAbout: [
    "child welfare NGO",
    "animal welfare NGO Bengaluru",
    "education sponsorship",
    "grassroots community welfare",
  ],
};

const serviceCategories = [
  {
    title: "Food & Sustenance Programs",
    icon: Utensils,
    description: "Ensuring no one sleeps hungry—providing nutritious meals to underprivileged humans, strays, and animals.",
    services: [
      "Feed a Homeless Person",
      "Fight Thirst. Share Water",
      "Chicken Biryani",
      "Feed a Stray Dog",
      "Thaali Meals",
      "Egg Biryani",
      "Veg Biryani",
      "Cow Feeding",
    ],
  },
  {
    title: "Child Care & Growth",
    icon: Baby,
    description: "Nurturing the future of our society with nutritional support, essentials, mobility, and care kits.",
    services: [
      "Egg & Milk",
      "Child Care Kit",
      "Gift for Children",
      "A Pair of Slippers",
      "Mother Care Kit",
      "Bicycle",
      "Banana & Milk",
      "Hygiene Kit",
      "Mosquito Net",
    ],
  },
  {
    title: "Education & Literacy",
    icon: GraduationCap,
    description: "Empowering young minds through learning resources and eradicating barriers to school retention.",
    services: [
      "School Bag",
      "Educate a Child",
      "Stop Child Labour",
    ],
  },
  {
    title: "Special Events & Joy",
    icon: Calendar,
    description: "Spreading smiles on special occasions and fostering kindness toward all living beings and communities.",
    services: [
      "Birthday Cake",
      "Virtual Cake Cutting Celebration",
      "Bird House",
      "Water Bowl For Birds",
      "Transgender Kit",
      "Birthday Celebration",
      "Save Lives Through Kindness",
      "Empower Dreams Through Livelihood",
    ],
  },
  {
    title: "Community & Welfare",
    icon: Heart,
    description: "Providing essential relief kits, medical aids, livelihood equipment, and comprehensive orphan support.",
    services: [
      "Blanket",
      "Grocery Kit",
      "Plant a Tree",
      "Wheelchair",
      "Give a Napkin",
      "Tailoring Machine",
      "Hearing Aid",
      "Dog Collar",
      "Support An Orphanage",
      "Our Orphanage",
    ],
  },
];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState(0);

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

  return (
    <div
      className={`min-h-[100dvh] w-full overflow-x-clip bg-[#F8FAF0] text-slate-900 dark:bg-black dark:text-slate-100 ${display.variable}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {/* NGO / NonProfit schema for search rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ngoSchema) }}
      />

      {/* ============ 01. HERO SECTION ============ */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-[#24310F] via-[#2F3E14] to-[#F8FAF0] text-white dark:from-black dark:via-zinc-950 dark:to-black">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#798321]/30 blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-1/4 h-80 w-80 rounded-full bg-[#FFC107]/20 blur-[120px] pointer-events-none"
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FFC107] backdrop-blur-md uppercase shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> About RAKVIH Foundation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white"
          >
            Empowering Lives Through{" "}
            <span className="bg-gradient-to-r from-[#FFC107] via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Compassion, Action &amp; Purpose
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-3xl space-y-3 text-sm sm:text-base leading-relaxed text-slate-200"
          >
            <p>
              RAKVIH Foundation is committed to creating a more compassionate, inclusive and empowered society by supporting people, children, communities and animals in need.
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              We believe that meaningful change begins with a simple act of kindness. Through community-focused initiatives in food support, education, child welfare, animal welfare, livelihood support and social development, we work to turn compassion into meaningful action.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC107]/40 bg-[#FFC107]/10 px-5 py-2 text-xs font-semibold text-[#FFC107] backdrop-blur-sm">
              <Compass className="h-4 w-4" />
              <span>Our approach is simple — identify genuine needs, take responsible action, and create an impact that matters.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 02. MAKE A DIFFERENCE & OUR PROMISE ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Narrative: Make a Difference */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-lg dark:border-zinc-800 dark:bg-[#0e0e0e]"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-3">
                <HeartHandshake className="h-4 w-4" /> Make a Difference
              </div>

              <h2 className="text-2xl font-extrabold text-[#1C2410] dark:text-white sm:text-3xl">
                It Starts With One Choice —{" "}
                <span className="text-[#798321] dark:text-[#FFC107]">The Choice to Care.</span>
              </h2>

              <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  RAKVIH Foundation was started with a simple belief: <strong>we may not be able to change the whole world, but we can change someone’s world.</strong>
                </p>
                <p>
                  Every day, there are people who need support, children who deserve opportunities, communities that need a helping hand, and animals that depend on our compassion. We started RAKVIH Foundation to turn concern into action and kindness into impact.
                </p>
                <p>
                  Our journey is about making a difference where it matters — one meal, one child, one family, one animal, one community at a time.
                </p>
                <p className="rounded-2xl border border-[#798321]/15 bg-[#F8FAF0] p-4 font-medium italic text-[#1C2410] dark:border-zinc-800 dark:bg-zinc-950 dark:text-slate-200">
                  &ldquo;We believe that making a difference is not always about doing something big. Sometimes, a small act of kindness at the right moment can bring hope, dignity and a reason to smile.&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Grassroots social welfare across Bengaluru &amp; India
              </span>
            </div>
          </motion.div>

          {/* Right Card: Our Promise & Be That Difference */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#24310F] via-[#2F3E14] to-[#798321] p-7 sm:p-10 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#FFC107]/20 blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FFC107] backdrop-blur-sm border border-white/15 mb-4">
                <Sparkles className="h-4 w-4" /> Our Promise
              </div>

              <h3 className="text-2xl font-extrabold text-[#FFC107] sm:text-3xl">
                We care. We act. We make a difference.
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                Because change doesn&apos;t always begin with millions. Sometimes, it begins with one person deciding to help.
              </p>

              <div className="my-6 rounded-2xl bg-white/10 p-4 border border-white/15 backdrop-blur-sm">
                <p className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                  Be That Difference.
                </p>
                <p className="text-xs text-amber-200 mt-0.5">
                  Join our collective movement of everyday changemakers.
                </p>
              </div>

              {/* 4 Action Pills */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Donate", link: "/foundation/donate" },
                  { label: "Volunteer", link: "/foundation/volunteer" },
                  { label: "Support", link: "/foundation/causes" },
                  { label: "Inspire", link: "/foundation/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#FFC107] hover:text-black border border-white/10"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={13} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
              <span>Every contribution matters</span>
              <span className="text-[#FFC107] font-semibold">100% Accountable</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ============ 03. OUR MISSION & OUR VISION ============ */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-lg dark:border-zinc-800 dark:bg-[#0e0e0e] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#798321] to-[#FFC107]"></div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-3">
                <Target className="h-4 w-4" /> Our Mission
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C2410] dark:text-white">
                To Serve With Compassion. To Act With Purpose. To Create Lasting Impact.
              </h3>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  Our mission is to support individuals and communities facing challenges by providing meaningful assistance, creating opportunities and encouraging a culture of kindness and social responsibility.
                </p>
                <p>
                  We strive to ensure that every initiative we undertake is driven by human dignity, transparency, responsibility and genuine care.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold text-[#798321] dark:text-[#FFC107]">
              <CheckCircle2 size={15} /> Grounded in compassion, driven by accountability
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-lg dark:border-zinc-800 dark:bg-[#0e0e0e] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#FFC107] to-amber-500"></div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-3">
                <Eye className="h-4 w-4" /> Our Vision
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C2410] dark:text-white">
                A Better Tomorrow Begins With What We Do Today.
              </h3>
              <div className="mt-4 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  We envision a society where every individual has the opportunity to live with dignity, every child has access to education and care, communities have the support they need to grow, and animals are treated with compassion.
                </p>
                <p>
                  Our vision is to build a future where kindness becomes action and action creates lasting change.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-[#FFC107]">
              <CheckCircle2 size={15} /> Building sustainable, compassionate communities
            </div>
          </motion.div>

        </div>
      </section>

      {/* ============ 04. WHAT SETS RAKVIH FOUNDATION APART ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Core Principles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2410] dark:text-white">
            What Sets RAKVIH Foundation Apart
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Our guiding ethos shapes how we listen, plan, deliver aid, and ensure that every contribution translates into verifiable social impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: HandHeart,
              title: "Compassion in Action",
              desc: "We believe that charity is not simply about giving — it is about understanding a need and responding with purpose.",
            },
            {
              icon: Users,
              title: "Community-Centred",
              desc: "We work closely with communities to understand genuine needs and direct our initiatives where support can make a meaningful difference.",
            },
            {
              icon: ShieldCheck,
              title: "Transparent & Accountable",
              desc: "We believe donors and supporters deserve clarity about how their contributions support our initiatives. We maintain appropriate records and share updates and impact information wherever applicable.",
            },
            {
              icon: Target,
              title: "Purpose-Driven",
              desc: "Every initiative is undertaken with a clear objective — to support people, strengthen communities and create positive social impact.",
            },
            {
              icon: Heart,
              title: "Every Contribution Matters",
              desc: "Whether it is a meal, educational support, animal care or a helping hand during a difficult time, every act of kindness can make a difference.",
            },
            {
              icon: Lightbulb,
              title: "Responsible Stewardship",
              desc: "We follow strict financial ethics, photo-verified distributions, and direct-to-beneficiary execution with zero commercial leakages.",
            },
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#798321] hover:shadow-md dark:border-zinc-800 dark:bg-[#0e0e0e] dark:hover:border-[#FFC107]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black mb-4">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#1C2410] dark:text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ 05. OUR FOCUS AREAS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 bg-[#F3F6E8] dark:bg-zinc-950/70 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/15 dark:text-[#FFC107] mb-2">
            <Compass className="h-3.5 w-3.5" /> Social Welfare Verticals
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2410] dark:text-white">
            Our Focus Areas
          </h2>
          <p className="text-sm font-semibold text-[#798321] dark:text-[#FFC107] mt-1">
            Creating Impact Across Communities
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            RAKVIH Foundation works across multiple areas of social welfare to address different needs within communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Utensils,
              title: "Food & Nutrition",
              desc: "Providing nutritious food and essential support to individuals and communities experiencing food insecurity.",
              link: "/foundation/causes?category=Food",
            },
            {
              icon: GraduationCap,
              title: "Education & Literacy",
              desc: "Supporting educational opportunities and resources that help children and individuals learn, grow and build a better future.",
              link: "/foundation/causes?category=Education",
            },
            {
              icon: Baby,
              title: "Child Welfare",
              desc: "Supporting children with essential needs, educational assistance and initiatives focused on their wellbeing and development.",
              link: "/foundation/causes?category=Child%20Support",
            },
            {
              icon: Heart,
              title: "Community Welfare",
              desc: "Supporting vulnerable individuals and communities through meaningful social welfare initiatives and assistance.",
              link: "/foundation/causes?category=Community",
            },
            {
              icon: PawPrint,
              title: "Animal Welfare",
              desc: "Promoting compassion towards animals through food support, care initiatives and assistance for animals in need.",
              link: "/foundation/causes?category=Animal%20Care",
            },
            {
              icon: Briefcase,
              title: "Livelihood & Empowerment",
              desc: "Supporting individuals and communities towards greater self-reliance, opportunity and sustainable development.",
              link: "/foundation/causes?category=Special%20Causes",
            },
          ].map((area, idx) => (
            <Link
              key={area.title}
              href={area.link}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#798321] hover:shadow-md dark:border-zinc-800 dark:bg-[#0e0e0e] dark:hover:border-[#FFC107]"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] transition-colors group-hover:bg-[#798321] group-hover:text-white dark:bg-[#FFC107]/10 dark:text-[#FFC107] dark:group-hover:bg-[#FFC107] dark:group-hover:text-black mb-4">
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1C2410] dark:text-white group-hover:text-[#798321] dark:group-hover:text-[#FFC107] transition-colors">
                  {area.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {area.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-[#798321] dark:text-[#FFC107]">
                <span>Explore Initiatives</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 06. WHAT WE DO ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2">
            <CheckCircle2 className="h-3.5 w-3.5" /> Action On The Ground
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2410] dark:text-white">
            What We Do
          </h2>
          <p className="text-sm font-semibold text-[#798321] dark:text-[#FFC107] mt-1">
            Turning Needs Into Action
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Our initiatives are designed around real community needs and are carried out with compassion and responsibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Food & Nutrition Initiatives",
              desc: "From meal distribution and drinking water support to food assistance for people and animals, we work towards creating communities where no one is forgotten.",
            },
            {
              title: "Education Support",
              desc: "We believe education can change the direction of a life. Our initiatives aim to support children and individuals with educational opportunities and essential resources.",
            },
            {
              title: "Child Welfare",
              desc: "We support initiatives focused on the wellbeing, care, education and development of children who need additional support.",
            },
            {
              title: "Community Support",
              desc: "From essential assistance to special community initiatives, we aim to stand beside people during times when a helping hand can make a difference.",
            },
            {
              title: "Animal Welfare",
              desc: "Our compassion extends beyond people. We support initiatives that provide food, care and assistance to animals in need.",
            },
            {
              title: "Special Initiatives",
              desc: "We conduct meaningful drives and campaigns around important occasions and community needs, bringing people together for a common purpose.",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#0e0e0e] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-[#798321] dark:bg-[#FFC107]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Initiative 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1C2410] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Check size={13} /> Active Field Program
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ 07. OUR APPROACH (LISTEN. ACT. IMPACT.) ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 border-t border-slate-200 dark:border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2">
            <Compass className="h-3.5 w-3.5" /> Systematic Execution
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2410] dark:text-white">
            Our Approach
          </h2>
          <p className="text-base font-bold text-[#798321] dark:text-[#FFC107] mt-1">
            Listen. Act. Impact.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We follow a simple, disciplined philosophy that guarantees transparency, rapid mobilization, and genuine on-the-ground change:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: "01",
              title: "Understand",
              desc: "Identify genuine needs within communities through grassroots engagement and verified assessments.",
              icon: Search,
            },
            {
              step: "02",
              title: "Act",
              desc: "Design and implement practical initiatives that directly and responsibly address those validated needs.",
              icon: Target,
            },
            {
              step: "03",
              title: "Support",
              desc: "Work closely with volunteers, donors and community members to deliver meaningful, respectful assistance.",
              icon: HandHeart,
            },
            {
              step: "04",
              title: "Create Impact",
              desc: "Measure, document and learn from our initiatives to continually improve future community welfare efforts.",
              icon: Sparkles,
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#0e0e0e] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold text-[#798321] dark:text-[#FFC107]">
                    {item.step}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1C2410] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Phase {item.step} Protocol
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ 08. OUR COMMITMENT TO TRANSPARENCY ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-amber-50/40 to-white p-7 sm:p-12 shadow-lg dark:border-zinc-800 dark:bg-gradient-to-br dark:from-[#0e0e0e] dark:via-zinc-950 dark:to-[#0e0e0e]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
                <ShieldCheck className="h-4 w-4" /> Integrity &amp; Trust
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2410] dark:text-white">
                Our Commitment to Transparency
              </h2>
              <p className="text-base font-bold text-[#798321] dark:text-[#FFC107]">
                Your Trust Matters
              </p>

              <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  Every contribution represents someone&apos;s trust in our mission.
                </p>
                <p>
                  We are committed to handling donations and support responsibly, maintaining appropriate records and communicating the progress and impact of our initiatives wherever applicable.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {["80G Tax Deductible", "NGO Darpan ID: KA/2026/0698188", "CSR-1 Registered", "Photo Evidence Verified"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:border-zinc-800 dark:bg-black dark:text-slate-300"
                  >
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Highlight Quote Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-amber-200/80 bg-amber-50/80 p-6 sm:p-7 shadow-sm dark:border-[#FFC107]/20 dark:bg-[#FFC107]/5">
                <Quote className="h-8 w-8 text-[#798321]/30 dark:text-[#FFC107]/40 mb-2" />
                <p className="text-sm sm:text-base font-bold italic leading-relaxed text-[#1C2410] dark:text-amber-200">
                  &ldquo;When you support a cause, you should know that your contribution is being used responsibly towards that cause.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-zinc-800 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span>RAKVIH Foundation Ethos</span>
                  <span className="text-[#798321] dark:text-[#FFC107]">Bangalore, India</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ============ 09. LEADERSHIP & CREDENTIALS (OUR DIRECTOR & TRUST) ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 border-t border-slate-200 dark:border-zinc-800 pt-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          
          {/* Left Side: Founder & Director Profile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex"
          >
            <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-zinc-800 dark:bg-[#0d0d0d] flex flex-col justify-between">
              
              {/* Header Badge & Title */}
              <div className="border-b border-slate-100 pb-4 dark:border-zinc-800">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FFC107]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFC107] mb-2.5">
                  <Users className="h-3.5 w-3.5" /> Leadership
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white relative pl-3">
                  <span className="absolute left-0 top-[10%] h-[80%] w-[3px] rounded-sm bg-[#FFC107]"></span>
                  Our Director
                </h3>
              </div>
              
              {/* Profile Details */}
              <div className="flex flex-col items-center text-center my-auto py-2">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-full bg-white ring-4 ring-[#FFC107]/40 shadow-xl mb-4">
                  <img 
                    src="/director1.png" 
                    alt="Vijay Kumar - Founder & Director" 
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                  Vijay Kumar
                </h3>
                <p className="text-xs sm:text-sm font-bold tracking-wide text-[#798321] dark:text-[#FFC107] mb-4">
                  Founder &amp; Director
                </p>

                {/* Director Quote Pill */}
                <div className="relative mx-auto mb-6 w-full rounded-2xl bg-amber-500/5 px-4 py-3 border border-amber-500/20 dark:bg-[#FFC107]/5 dark:border-[#FFC107]/20">
                  <Quote className="mx-auto mb-1.5 h-4 w-4 text-amber-500/70 dark:text-[#FFC107]/70" />
                  <p className="text-xs sm:text-[13px] font-semibold italic text-slate-800 dark:text-amber-200/90 leading-snug">
                    &ldquo;A Vision to Serve. A Mission to Transform.&rdquo;
                  </p>
                </div>
                
                {/* Social Media Icons */}
                <div className="flex items-center justify-center gap-4">
                  {/* LinkedIn */}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-[#111] transition-transform hover:scale-110 hover:bg-yellow-400 shadow-md" 
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-[#111] transition-transform hover:scale-110 hover:bg-yellow-400 shadow-md" 
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-[#111] transition-transform hover:scale-110 hover:bg-yellow-400 shadow-md" 
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.76-6.985 6.138C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.204 4.358 1.76 6.78 6.138 6.985 1.28.058 1.688.072 4.947.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.76 6.985-6.138.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.203-4.358-1.76-6.78-6.138-6.985-1.28-.058-1.688-.072-4.948-.072zm0 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838zm0 10.162A4.001 4.001 0 1 1 12 7.999a4.001 4.001 0 0 1 0 8.002zm3.963-9.525a1.44 1.44 0 1 0 0-2.881 1.44 1.44 0 0 0 0 2.881z"/>
                    </svg>
                  </a>

                  {/* Google */}
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107] text-[#111] transition-transform hover:scale-110 hover:bg-yellow-400 shadow-md" 
                    aria-label="Google"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.001 9.803v4.46h5.837c-.244 1.932-2.316 5.658-5.837 5.658-3.513 0-6.38-2.92-6.38-6.52s2.867-6.52 6.38-6.52c1.996 0 3.332.85 4.095 1.583l3.39-3.267C17.545 3.328 15.021 2 12.001 2 6.478 2 2 6.478 2 12s4.478 10 10.001 10c5.772 0 9.615-4.062 9.615-9.789 0-.663-.07-1.18-.17-1.703h-9.445z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom Spacer balance */}
              <div className="hidden sm:block h-2"></div>
            </div>
          </motion.div>

          {/* Right Side: Trust & Compliance Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 flex flex-col justify-between"
          >
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2">
                <ShieldCheck className="h-3.5 w-3.5" /> Official Recognition
              </div>
              <h2 className="text-xl font-extrabold text-[#24310F] dark:text-white sm:text-2xl mb-1.5">
                Trust &amp; Compliance
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                Every rupee you entrust to RAKVIH Foundation is accounted for, tax-deductible under Indian law, and delivered with verifiable proof to real beneficiaries.
              </p>
            </div>

            {/* Seamless 4-card structure with centered NGO Darpan ID connector */}
            <div className="flex flex-col gap-3 flex-1 justify-between">
              
              {/* Row 1: 80G Certified & Secure Donation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. 80G Certified */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-[#0d0d0d] flex flex-col justify-between">
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#798321] via-[#FFC107] to-amber-500 transition-all duration-500 group-hover:w-full"></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-[#FFC107]/15 dark:text-[#FFC107] transition-transform duration-300 group-hover:scale-105">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={10} /> Verified
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      80G Certified
                    </h3>
                    <p className="text-[11px] font-semibold text-[#798321] dark:text-[#FFC107] mt-0.5">
                      Tax exemption eligible
                    </p>
                  </div>
                  <p className="mt-2.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                    Eligible for 50% tax deduction under Section 80G with instant 10BE receipt.
                  </p>
                </div>

                {/* 2. Secure Donation */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-[#0d0d0d] flex flex-col justify-between">
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#798321] via-emerald-400 to-emerald-600 transition-all duration-500 group-hover:w-full"></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-105">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={10} /> Encrypted
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Secure Donation
                    </h3>
                    <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Encrypted &amp; safe
                    </p>
                  </div>
                  <p className="mt-2.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                    256-bit bank-grade SSL encryption powered by Razorpay payment gateway.
                  </p>
                </div>
              </div>

              {/* CENTER RIBBON: NGO Darpan Registered */}
              <div className="group relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-white to-amber-500/10 dark:from-[#FFC107]/10 dark:via-[#0d0d0d] dark:to-[#FFC107]/10 p-3 shadow-sm transition hover:border-[#FFC107]/50 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFC107]/20 text-amber-600 dark:text-[#FFC107]">
                      <Building2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          NGO Darpan Registered
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#798321]/15 px-2 py-0.5 text-[9px] font-bold text-[#798321] dark:bg-[#FFC107]/15 dark:text-[#FFC107]">
                          <CheckCircle2 size={9} /> NITI Aayog Portal
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                        Official registration on Government of India portal for certified transparency &amp; accountability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 100% Transparent & CSR Eligible */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 3. 100% Transparent */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-[#0d0d0d] flex flex-col justify-between">
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-[#798321] transition-all duration-500 group-hover:w-full"></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                        <Camera className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400">
                        <CheckCircle2 size={10} /> Photo Proof
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      100% Transparent
                    </h3>
                    <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                      Photo proof shared
                    </p>
                  </div>
                  <p className="mt-2.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                    Time-stamped photographic and video evidence delivered for every sponsored cause.
                  </p>
                </div>

                {/* 4. CSR Eligible */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-[#0d0d0d] flex flex-col justify-between">
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-[#FFC107] transition-all duration-500 group-hover:w-full"></div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400 transition-transform duration-300 group-hover:scale-105">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-600 dark:text-purple-400">
                        <CheckCircle2 size={10} /> MCA Compliant
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      CSR Eligible
                    </h3>
                    <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                      CSR-Form-1 Compliant
                    </p>
                  </div>
                  <p className="mt-2.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                    Registered on MCA portal with valid CSR-Form-1 for corporate CSR allocations.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 10. OUR SERVICES DIRECTORY ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 border-t border-slate-200 dark:border-zinc-800">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#798321] dark:text-[#FFC107]">
            Active Catalog
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#24310F] dark:text-white sm:text-3xl">
            Our Core Service Verticals
          </h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
            Select a category below to explore our detailed programs and individual sponsorship options.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {serviceCategories.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all shadow-sm ${
                activeCategory === idx
                  ? "bg-[#798321] text-white shadow-md dark:bg-[#FFC107] dark:text-black"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-slate-300 dark:hover:bg-zinc-900"
              }`}
            >
              <cat.icon className="h-4 w-4" />
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Display Card */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-3xl border border-slate-900/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-black sm:p-8"
        >
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5 dark:border-zinc-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]">
              {(() => {
                const IconComponent = serviceCategories[activeCategory].icon;
                return <IconComponent className="h-6 w-6" />;
              })()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#24310F] dark:text-white">
                {serviceCategories[activeCategory].title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {serviceCategories[activeCategory].description}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories[activeCategory].services.map((serviceName) => (
              <div
                key={serviceName}
                className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:border-[#798321]/30 hover:bg-slate-100/90 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-[#FFC107]/40 dark:hover:bg-zinc-800/90"
              >
                <CheckCircle2 className="h-4.5 w-4.5 text-[#798321] dark:text-[#FFC107] shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 dark:group-hover:text-white transition-colors">
                  {serviceName}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============ 11. SUGGESTED FINAL CALL TO ACTION ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8 space-y-10">
        
        {/* Action Banner: Ready to Make a Difference? */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#24310F] via-[#2F3E14] to-[#798321] p-8 sm:p-12 text-center text-white shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#FFC107]/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FFC107] border border-white/15 backdrop-blur-sm">
              <Sparkles size={13} /> Suggested Final Call to Action
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Make a Difference?
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto font-medium">
              Your support can become someone&apos;s hope, someone&apos;s opportunity, or someone&apos;s tomorrow.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Join RAKVIH Foundation in creating meaningful change — one initiative, one community and one life at a time.
            </p>

            {/* 3 Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/foundation/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105 hover:bg-yellow-400"
              >
                Donate Now <ArrowRight size={14} />
              </Link>
              <Link
                href="/foundation/volunteer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                Become a Volunteer
              </Link>
              <Link
                href="/foundation/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Narrative & Belief Deep Dive (Aesthetic, cute cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: It Started With One Simple Thought */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-lg dark:border-zinc-800 dark:bg-[#0e0e0e] flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-3">
                <HeartHandshake className="h-4 w-4" /> Make a Difference
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C2410] dark:text-white">
                It Started With One Simple Thought —{" "}
                <span className="text-[#798321] dark:text-[#FFC107]">We Can Do More.</span>
              </h3>

              <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  RAKVIH Foundation was started with a simple belief: <strong>every one of us has the power to make a difference in society.</strong>
                </p>
                <p>
                  We see people who need a helping hand, children who deserve better opportunities, communities that need support, and animals that depend on our compassion. We believe that these challenges cannot always be solved by someone else.
                </p>
                <div className="rounded-2xl border-l-4 border-[#798321] bg-[#F8FAF0] p-4 text-[#1C2410] dark:border-[#FFC107] dark:bg-zinc-950 dark:text-white font-medium">
                  They begin to change when we choose to care.
                </div>
                <p>
                  RAKVIH Foundation was created to turn that thought into action — to bring together people who want to help and create meaningful opportunities to support those who need it most.
                </p>
                <p>
                  We may not be able to change the entire world overnight. But we can make one person smile, one child learn, one family receive a meal, one animal receive care, or one community find hope.
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  And sometimes, one small difference can become the beginning of something much bigger.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Every act of kindness creates ripples of hope</span>
              <span className="text-[#798321] dark:text-[#FFC107] font-bold">RAKVIH Foundation</span>
            </div>
          </motion.div>

          {/* Right Column: Why We Do What We Do & Our Belief */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Box 1: Why We Do What We Do */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg dark:border-zinc-800 dark:bg-[#0e0e0e]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#798321]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107] mb-2.5">
                <Target className="h-3.5 w-3.5" /> Motivation
              </div>
              <h4 className="text-xl font-bold text-[#1C2410] dark:text-white">
                Why We Do What We Do
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We don&apos;t believe that making a difference is about how much you give.
              </p>

              {/* 3 Steps */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Choosing to give.", icon: HandHeart },
                  { label: "Choosing to care.", icon: Heart },
                  { label: "Choosing to act.", icon: Sparkles },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-100 bg-[#F8FAF0] p-3 dark:border-zinc-800 dark:bg-zinc-950 flex flex-col items-center justify-center">
                    <item.icon size={16} className="text-[#798321] dark:text-[#FFC107] mb-1.5" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Whether it is your time, your resources, your skills, or simply your support — every contribution can create an impact.
              </p>
            </div>

            {/* Box 2: Our Belief Quote & Seal */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-[#798321]/10 p-6 sm:p-8 border border-amber-500/25 dark:border-[#FFC107]/20 dark:bg-zinc-950/60 shadow-lg flex-1 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:bg-[#FFC107]/15 dark:text-[#FFC107] mb-3">
                  <Quote size={11} /> Our Belief
                </div>

                <blockquote className="text-base sm:text-lg font-bold italic leading-snug text-[#1C2410] dark:text-amber-200">
                  &ldquo;You don&apos;t have to change the whole world.<br />
                  Just make a difference where you can.&rdquo;
                </blockquote>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  That is the thought behind RAKVIH Foundation.
                </p>

                <div className="mt-3 space-y-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <p className="flex items-center gap-1.5"><Check size={12} className="text-[#798321] dark:text-[#FFC107]" /> That is our purpose.</p>
                  <p className="flex items-center gap-1.5"><Check size={12} className="text-[#798321] dark:text-[#FFC107]" /> That is our commitment.</p>
                  <p className="flex items-center gap-1.5"><Check size={12} className="text-[#798321] dark:text-[#FFC107]" /> That is our journey.</p>
                </div>
              </div>

              {/* RAKVIH Foundation Signature Badge */}
              <div className="mt-5 pt-4 border-t border-amber-200/60 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-black tracking-wider text-[#1C2410] dark:text-white uppercase">
                    RAKVIH FOUNDATION
                  </span>
                  <span className="text-[11px] font-bold text-[#798321] dark:text-[#FFC107]">
                    Just Make a Difference.
                  </span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#798321] text-white dark:bg-[#FFC107] dark:text-black shadow-sm">
                  <Heart size={16} />
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </div>
  );
}