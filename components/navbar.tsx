"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="flex items-center gap-8 py-4">
      <Link 
        className={`text-lg font-medium hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600' : ''}`} 
        href="/"
      >
        Djoufson
      </Link>
      <div className="flex items-baseline gap-4">
        <Link 
          className={`text-sm hover:text-blue-600 transition-colors ${isActive('/projects') ? 'text-blue-600' : ''}`} 
          href="/projects"
        >
          What I Build
        </Link>
        <div className="relative">
          <Link 
            className="text-sm text-muted-foreground cursor-not-allowed" 
            href="#"
            title="Coming Soon"
          >
            Community
          </Link>
          <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full">
            Soon
          </span>
        </div>
        <div className="relative">
          <Link 
            className="text-sm text-muted-foreground cursor-not-allowed" 
            href="#"
            title="Coming Soon"
          >
            Blog
          </Link>
          <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full">
            Soon
          </span>
        </div>
      </div>
    </nav>
  )
}
