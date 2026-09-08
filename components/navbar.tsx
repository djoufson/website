"use client"

import { Link, usePathname } from '@/i18n/routing'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ThemeToggle } from './theme-toggle'
import LanguageSwitcher from './LanguageSwitcher'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('Navigation');

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const links: Array<{ href: string; label: string; comingSoon?: boolean }> = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/art', label: t('art') },
    { href: '/blog', label: t('blog') },
    { href: '/community', label: t('community') },
    { href: '/contact', label: t('contact') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <div className="flex items-baseline gap-4">
            {links.map((link) => (
              link.comingSoon ? (
                <div key={link.href} className="relative">
                  <Link
                    className="text-sm text-muted-foreground cursor-not-allowed"
                    href="#"
                    title={t('soon')}
                  >
                    {link.label}
                  </Link>
                  <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full">
                    {t('soon')}
                  </span>
                </div>
              ) : (
                <Link
                  key={link.href}
                  className={`text-sm custom-blue-link ${
                    isActive(link.href) ? "custom-blue-link-active" : ""
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              )
            ))}
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
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle menu"
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
              {links.map((link) => (
                link.comingSoon ? (
                  <div key={link.href} className="relative">
                    <div className="text-sm text-muted-foreground py-2">
                      {link.label}
                      <span className="ml-2 text-[10px] px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                        {t('soon')}
                      </span>
                    </div>
                  </div>
                ) : (
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
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
