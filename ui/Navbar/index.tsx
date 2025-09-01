"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/addSchool", label: "Add School" },
    { href: "/showSchool", label: "Show Schools" },
  ];

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-fuchsia-900">
         Logo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {links.map((link) => {
            const isActive =
              mounted && pathname === link.href
                ? "bg-fuchsia-800 text-white"
                : "hover:bg-fuchsia-800 hover:text-white";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded transition ${isActive}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-3 px-6 pb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded transition ${
                mounted && pathname === link.href
                  ? "bg-fuchsia-800 text-white"
                  : "hover:bg-fuchsia-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
