import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <nav className="flex items-center gap-8 py-4">
      <Link className="text-lg font-medium hover:text-blue-600 transition-colors" href="/">
        Djoufson
      </Link>
      <div className="flex items-baseline gap-4">
        <Link 
          className="text-sm hover:text-blue-600 transition-colors" 
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
