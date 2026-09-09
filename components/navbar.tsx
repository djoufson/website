"use client";

import { Link, usePathname } from "@/i18n/routing";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type NavLink = { href: string; label: string };
type NavGroup = { label: string; items: NavLink[] };
type NavEntry = NavLink | NavGroup;

const isGroup = (entry: NavEntry): entry is NavGroup => (entry as NavGroup).items !== undefined;

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("Navigation");

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Grouped into dropdown menus to keep the bar short.
  const entries: NavEntry[] = [
    { href: "/", label: t("home") },
    {
      label: t("work"),
      items: [
        { href: "/projects", label: t("projects") },
        { href: "/art", label: t("art") },
      ],
    },
    { href: "/blog", label: t("blog") },
    {
      label: t("more"),
      items: [
        { href: "/about", label: t("about") },
        { href: "/community", label: t("community") },
        { href: "/contact", label: t("contact") },
      ],
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          className={`text-lg font-medium custom-blue-link ${
            isActive("/") ? "custom-blue-link-active" : ""
          }`}
          href="/"
        >
          Djoufson
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {entries.map((entry) =>
              isGroup(entry) ? (
                <NavDropdown key={entry.label} group={entry} isActive={isActive} />
              ) : (
                <Link
                  key={entry.href}
                  className={`text-sm custom-blue-link ${
                    isActive(entry.href) ? "custom-blue-link-active" : ""
                  }`}
                  href={entry.href}
                >
                  {entry.label}
                </Link>
              )
            )}
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {entries.map((entry) =>
                isGroup(entry) ? (
                  <div key={entry.label}>
                    <p className="px-1 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {entry.label}
                    </p>
                    <div className="space-y-1 border-l border-border pl-3">
                      {entry.items.map((link) => (
                        <Link
                          key={link.href}
                          className={`block text-sm py-2 custom-blue-link ${
                            isActive(link.href) ? "custom-blue-link-active" : ""
                          }`}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={entry.href}
                    className={`block text-sm py-2 custom-blue-link ${
                      isActive(entry.href) ? "custom-blue-link-active" : ""
                    }`}
                    href={entry.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {entry.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavDropdown({
  group,
  isActive,
}: {
  group: NavGroup;
  isActive: (path: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const groupActive = group.items.some((item) => isActive(item.href));

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 text-sm custom-blue-link ${
          groupActive ? "custom-blue-link-active" : ""
        }`}
      >
        {group.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Kept in the DOM (not conditionally mounted) so the links stay
          crawlable and discoverable; visibility is toggled with CSS. */}
      <div
        role="menu"
        aria-label={group.label}
        className={`absolute left-0 top-full z-50 mt-2 min-w-[11rem] rounded-lg border border-border bg-card p-1 shadow-lg transition-all duration-150 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {group.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted ${
              isActive(item.href) ? "text-[var(--custom-blue)]" : "text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
