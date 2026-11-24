"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Fraunces } from "next/font/google";
import { ArrowLeft, Heart, Menu, X, Sun, Moon, ChevronDown, Layers, Users, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import LanguageTranslator from "@/components/foundation/LanguageTranslator";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
  variable: "--font-display",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const fallbackCategories = [
  {
    id: 1,
    title: "Social Welfare",
    cause_items: [
      { id: 101, title: "Child Education", name: "Child Education" },
      { id: 102, title: "Healthcare Support", name: "Healthcare Support" },
    ],
  },
  {
    id: 2,
    title: "Environment",
    cause_items: [
      { id: 201, title: "Tree Plantation", name: "Tree Plantation" },
      { id: 202, title: "Clean Water", name: "Clean Water" },
    ],
  },
];

const navLinks = [
  { href: "/foundation", label: "Home" },
  { href: "/foundation/about", label: "About Us" },
  { href: "/foundation/causes", label: "Ways to Give", hasDropdown: true },
  { href: "/foundation/csr", label: "CSR" },
  { href: "/foundation/gallery", label: "Gallery" },
  { href: "/foundation/contact", label: "Contact" },
];

const subscribeToHydration = () => () => {};

export default function FoundationNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [causesOpen, setCausesOpen] = useState(false);
  const [categories, setCategories] = useState(fallbackCategories);
  const desktopNavLink = "flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-sm font-semibold transition-colors 2xl:px-3.5";
  const activeNavLink = "bg-[#798321]/12 text-[#465019] dark:bg-[#FFC107]/12 dark:text-[#FFC107]";
  const idleNavLink = "text-slate-700 hover:bg-white hover:text-[#465019] dark:text-neutral-300 dark:hover:bg-white/8 dark:hover:text-white";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [volunteer, setVolunteer] = useState<{ id: string; name: string } | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    async function fetchNavbarCauses() {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          supabase
            .from("cause_categories")
            .select("id, title, created_at")
            .order("created_at", { ascending: true }),
          supabase.from("cause_items").select("id, category_id, title, name, is_active"),
        ]);

        if (!categoriesRes.error && categoriesRes.data && !itemsRes.error && itemsRes.data) {
          const combined = categoriesRes.data.map((cat) => ({
            ...cat,
            cause_items: itemsRes.data.filter(
              (item) => item.category_id === cat.id && item.is_active !== false
            ),
          }));

          if (combined.length > 0) {
            setCategories(combined);
          }
        }
      } catch (err) {
        console.error("Using fallback navigation links due to fetch error:", err);
      }
    }

    fetchNavbarCauses();

    const checkVolunteer = () => {
      if (typeof window !== "undefined") {
        const vid = localStorage.getItem("rakvih_volunteer_id");
        const vname = localStorage.getItem("rakvih_volunteer_name");
        if (vid) {
          setVolunteer({ id: vid, name: vname || "Volunteer" });
        } else {
          setVolunteer(null);
        }
      }
    };

    checkVolunteer();
    window.addEventListener("storage", checkVolunteer);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCausesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("storage", checkVolunteer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rakvih_volunteer_id");
      localStorage.removeItem("rakvih_volunteer_name");
      setVolunteer(null);
      if (pathname.includes("/foundation/volunteer/dashboard")) {
        router.push("/foundation/volunteer");
      }
    }
  };

  if (
    pathname.includes("/foundation/volunteer/dashboard") ||
    pathname.includes("/adminfoundations")
  ) {
    return null;
  }

  const isDark = (resolvedTheme || theme) === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] w-full border-b border-[#798321]/20 bg-[#FCFCF6]/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10110D]/95 transition-colors duration-500 ${display.variable}`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-2 px-3 sm:h-[94px] sm:gap-4 sm:px-6">
        
        {/* Left: Back Arrow & Logo */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 min-w-0">
          <button
            onClick={handleBack}
            className="flex h-8 w-8 sm:h-9.5 sm:w-9.5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>

          <Link href="/foundation" className="flex items-center">
            <div className="relative h-12 w-28 min-[360px]:w-36 sm:h-16 sm:w-48 2xl:w-56">
              <Image
                src="/rakvih-foundation.png"
                alt="RAKVIH Foundation Logo"
                fill
                priority
                unoptimized
                sizes="(max-width: 639px) 144px, (max-width: 1535px) 192px, 224px"
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        <nav aria-label="Foundation navigation" className="hidden shrink-0 items-center gap-0.5 rounded-full border border-[#798321]/15 bg-[#798321]/5 p-1 dark:border-white/10 dark:bg-white/5 xl:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div key={link.href} className="relative shrink-0" ref={dropdownRef}>
                  <button
                    onClick={() => setCausesOpen(!causesOpen)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setCausesOpen(false);
                    }}
                    aria-expanded={causesOpen}
                    aria-controls="foundation-causes-menu"
                    className={`${desktopNavLink} ${pathname.startsWith(link.href) ? activeNavLink : idleNavLink}`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${causesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Desktop Causes Dropdown */}
                  <AnimatePresence>
                    {causesOpen && (
                      <motion.div
                        id="foundation-causes-menu"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-[860px] max-w-[90vw] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-[#0a0a0a] z-50 max-h-[75vh] overflow-y-auto space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-1 dark:border-neutral-800">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                            Explore Causes
                          </span>
                          <Link
                            href="/foundation/causes"
                            onClick={() => setCausesOpen(false)}
                            className="text-xs font-bold text-[#798321] dark:text-[#FFC107] hover:underline"
                          >
                            View All Causes
                          </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {categories.map((cat) => (
                            <div
                              key={cat.id}
                              className="space-y-2 rounded-2xl bg-slate-50/70 p-3.5 dark:bg-[#171717] border border-slate-100 dark:border-neutral-800 flex flex-col justify-between"
                            >
                              <div>
                                <Link
                                  href="/foundation/causes"
                                  onClick={() => setCausesOpen(false)}
                                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#24310F] hover:text-[#798321] dark:text-white dark:hover:text-[#FFC107] transition-colors mb-2"
                                >
                                  <Layers size={13} className="text-[#798321] dark:text-[#FFC107] shrink-0" />
                                  <span className="truncate">{cat.title}</span>
                                </Link>

                                {cat.cause_items && cat.cause_items.length > 0 ? (
                                  <div className="space-y-1 pl-1 border-l border-slate-200 dark:border-neutral-800 ml-1">
                                    {cat.cause_items.map((item) => (
                                      <Link
                                        key={item.id}
                                        href={`/foundation/donate?cause=${item.id}`}
                                        onClick={() => setCausesOpen(false)}
                                        className="block rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:text-[#798321] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-[#FFC107] truncate transition-colors"
                                      >
                                        {item.name || item.title}
                                      </Link>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="pl-2 text-[11px] text-slate-400 dark:text-neutral-500 italic">
                                    No causes listed
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`${desktopNavLink} ${isActive ? activeNavLink : idleNavLink}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Controls (shrink-0, perfectly positioned) */}
        <div className="flex items-center gap-1 sm:gap-2 xl:gap-2.5 shrink-0">
          <div className="hidden sm:block">
            <LanguageTranslator variant="desktop" />
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 shrink-0"
          >
            {!mounted ? (
              <div className="h-[16px] w-[16px]" />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            )}
          </button>

          {/* Volunteer Button - only shown when not logged in */}
          {!volunteer && (
            <Link
              href="/foundation/volunteer"
              style={{ fontFamily: "var(--font-display)" }}
              className="group hidden items-center gap-1.5 rounded-full border border-[#798321]/40 bg-transparent px-3 py-2 text-xs font-semibold text-[#798321] transition-all hover:bg-[#798321]/10 dark:border-[#FFC107]/40 dark:text-[#FFC107] dark:hover:bg-[#FFC107]/10 xl:flex xl:px-3.5 xl:py-2.5 sm:text-sm shrink-0 whitespace-nowrap"
            >
              <Users size={15} className="transition-transform group-hover:scale-110" />
              <span>Volunteer</span>
            </Link>
          )}

          {/* Donate Button */}
          <Link
            href="/foundation/genraldonate"
            style={{ fontFamily: "var(--font-display)" }}
            className="group hidden items-center gap-1.5 rounded-full bg-[#FFC107] px-3.5 py-2 text-xs font-bold text-[#201A04] shadow-sm transition-colors hover:bg-[#FFD24A] sm:flex sm:px-4 sm:py-2.5 sm:text-sm dark:text-black shrink-0 whitespace-nowrap"
          >
            <Heart size={15} className="transition-transform group-hover:scale-110" fill="currentColor" />
            <span>Donate</span>
          </Link>

          {/* Logged in Volunteer Badge & Logout Button */}
          {volunteer && (
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-neutral-800 shrink-0">
              <Link
                href="/foundation/volunteer/dashboard"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#798321]/10 text-[#798321] hover:bg-[#798321]/20 dark:bg-[#FFC107]/15 dark:text-[#FFC107] dark:hover:bg-[#FFC107]/25 transition text-xs font-bold shadow-sm shrink-0"
                title={`Logged in as ${volunteer.name}. Click to view dashboard.`}
              >
                <div className="h-5 w-5 rounded-full bg-[#798321] text-white dark:bg-[#FFC107] dark:text-black flex items-center justify-center text-[10px] font-extrabold shrink-0">
                  {volunteer.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[85px] xl:max-w-[110px] truncate">{volunteer.name}</span>
              </Link>
              
              <button
                onClick={handleLogout}
                title="Log out from volunteer account"
                className="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200/80 dark:border-rose-900/40 dark:text-rose-400 dark:hover:bg-rose-950/40 transition shrink-0"
              >
                <LogOut size={13} />
                <span className="hidden xl:inline text-[11px]">Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle (Always visible, shrink-0, priority!) */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="foundation-mobile-menu"
            className="flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 xl:hidden shrink-0 shadow-sm"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="foundation-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#0a0a0a] xl:hidden"
          >
            <div className="flex flex-col space-y-2 px-6 py-6 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <details key={link.href} className="group rounded-xl bg-[#798321]/5 dark:bg-white/5">
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#465019] dark:text-[#FFC107] [&::-webkit-details-marker]:hidden">
                        {link.label}
                        <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                      </summary>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        style={{ fontFamily: "var(--font-display)" }}
                        className="mx-4 block rounded-lg px-2 py-2 text-sm font-semibold text-[#465019] dark:text-[#FFC107]"
                      >
                        View All Causes
                      </Link>

                      <div className="pl-4 space-y-3 border-l-2 border-slate-200 dark:border-neutral-800 mx-4 mt-1 mb-4">
                        {categories.map((cat) => (
                          <div key={cat.id} className="space-y-1.5">
                            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-200 px-2 py-1 bg-slate-50 dark:bg-neutral-900 rounded-lg">
                              <Layers size={12} className="text-[#798321] dark:text-[#FFC107]" />
                              {cat.title}
                            </span>

                            {cat.cause_items && cat.cause_items.length > 0 ? (
                              <div className="pl-4 space-y-1 border-l border-slate-200 dark:border-neutral-800 ml-2">
                                {cat.cause_items.map((item) => (
                                  <Link
                                    key={item.id}
                                    href={`/foundation/donate?cause=${item.id}`}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white transition-colors"
                                  >
                                    • {item.name || item.title}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="pl-4 text-[11px] text-slate-400 dark:text-neutral-500 italic">
                                No items available
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ fontFamily: "var(--font-display)" }}
                    className={`block rounded-xl px-4 py-3 text-[15px] font-medium tracking-tight transition-all ${
                      isActive
                        ? "bg-[#798321]/10 text-[#798321] dark:bg-[#FFC107]/10 dark:text-[#FFC107]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <LanguageTranslator variant="mobile" />

              <div className="flex flex-col gap-2.5 border-t border-slate-200 pt-4 dark:border-neutral-800">
                {volunteer ? (
                  <div className="p-3.5 sm:hidden rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-[#798321] text-white dark:bg-[#FFC107] dark:text-black flex items-center justify-center font-bold text-xs">
                        {volunteer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{volunteer.name}</p>
                        <p className="text-[10px] font-bold text-[#798321] dark:text-[#FFC107] uppercase">Volunteer Active</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/foundation/volunteer/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-1 rounded-xl bg-[#798321] text-white dark:bg-[#FFC107] dark:text-black py-2 text-xs font-bold shadow transition"
                      >
                        <Users size={13} />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="flex items-center justify-center gap-1 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 py-2 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                      >
                        <LogOut size={13} />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/foundation/volunteer"
                    onClick={() => setOpen(false)}
                    style={{ fontFamily: "var(--font-display)" }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#798321]/40 bg-transparent px-5 py-3 text-sm font-semibold text-[#798321] dark:border-[#FFC107]/40 dark:text-[#FFC107]"
                  >
                    <Users size={18} />
                    Join as Volunteer
                  </Link>
                )}

                <Link
                  href="/foundation/genraldonate"
                  onClick={() => setOpen(false)}
                  style={{ fontFamily: "var(--font-display)" }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC107] px-5 py-3.5 text-sm font-bold text-[#201A04] shadow-sm active:scale-95 sm:hidden dark:text-black"
                >
                  <Heart size={18} fill="currentColor" />
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
