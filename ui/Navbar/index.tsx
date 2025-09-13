"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type LinkItem = {
  href: string;
  label: string;
  onClick?: () => void;
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const loggedIn = !!(
    typeof window !== "undefined" && localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  if (!mounted) return null;

  const links: LinkItem[] = [
    { href: "/", label: "Home" },
    loggedIn && { href: "/addSchool", label: "Add School" },
    { href: "/showSchool", label: "Show Schools" },
    loggedIn
      ? {
          href: "#",
          label: "Logout",
          onClick: handleLogout,
        }
      : { href: "/login", label: "Login" },
  ].filter((link): link is LinkItem => !!link);

  return (
    <nav className="bg-white text-black px-6 py-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-fuchsia-900">
          Logo
        </Link>

        <div className="hidden md:flex space-x-4">
          {links.map((link) =>
            link.onClick ? (
              <button
                key={link.label}
                onClick={link.onClick}
                className={`px-3 py-2 rounded transition cursor-pointer ${
                  pathname === link.href
                    ? "bg-fuchsia-800 text-white"
                    : "hover:bg-fuchsia-800 hover:text-white"
                }`}>
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded transition ${
                  pathname === link.href
                    ? "bg-fuchsia-800 text-white"
                    : "hover:bg-fuchsia-800 hover:text-white"
                }`}>
                {link.label}
              </Link>
            )
          )}
        </div>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-3 px-6 pb-4">
          {links.map((link) =>
            link.onClick ? (
              <button
                key={link.label}
                onClick={link.onClick}
                className={`px-3 py-2 rounded transition cursor-pointer ${
                  pathname === link.href
                    ? "bg-fuchsia-800 text-white"
                    : "hover:bg-fuchsia-800 hover:text-white"
                }`}>
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded transition ${
                  pathname === link.href
                    ? "bg-fuchsia-800 text-white"
                    : "hover:bg-fuchsia-800 hover:text-white"
                }`}>
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
