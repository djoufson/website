'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
}