"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Home",
    href: "/education",
  },
  {
    name: "About Us",
    href: "/education/about",
  },
  {
    name: "Programs",
    href: "/education/programs",
  },
  {
    name: "Tuition",
    href: "/education/tuition",
  },
  {
    name: "Success Stories",
    href: "/education/success-stories",
  },
  {
    name: "FAQ",
    href: "/education/faq",
  },
  {
    name: "Contact",
    href: "/education/contact",
  },
];

export default function DesktopMenu() {
  const pathname = usePathname();

  return (
    <ul className="hidden lg:flex items-center gap-8">
      {menus.map((menu) => (
        <li key={menu.name}>
          <Link
            href={menu.href}
            className={`font-medium transition ${
              pathname === menu.href
                ? "text-[#FFC107]"
                : "text-white hover:text-[#FFC107]"
            }`}
          >
            {menu.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}