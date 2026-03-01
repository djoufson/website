import React from 'react';
import { Github, Linkedin, Twitter, Rss } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Github',
      href: 'https://github.com/djoufson',
      icon: Github,
      title: "Djoufson Che Bene's Github"
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/djoufson',
      icon: Linkedin,
      title: "Djoufson Che Bene's LinkedIn"
    },
    {
      name: 'Twitter/X',
      href: 'https://x.com/djouf_legran',
      icon: Twitter,
      title: "Djoufson Che Bene's Twitter/X"
    },
    {
      name: 'RSS Feed',
      href: '/feed.xml',
      icon: Rss,
      title: "RSS Feed"
    }
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex gap-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  title={link.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.href}
                >
                  <IconComponent size={16} />
                  {link.name}
                </a>
              );
            })}
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; Djoufson {new Date().getFullYear()}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold">Connect with me</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    title={link.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.href}
                  >
                    <IconComponent size={18} />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border text-center">
            <div className="text-sm text-muted-foreground">
              &copy; Djoufson {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
