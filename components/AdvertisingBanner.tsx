'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { getActiveBanner, type BannerConfig } from '@/data/banner';

export default function AdvertisingBanner() {
  const [banner, setBanner] = useState<BannerConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const activeBanner = getActiveBanner();
    if (!activeBanner) return;

    // Check if banner was previously dismissed
    const dismissedBanners = JSON.parse(
      localStorage.getItem('dismissedBanners') || '[]'
    );

    if (dismissedBanners.includes(activeBanner.id)) {
      return;
    }

    setBanner(activeBanner);
    // Delay visibility for smooth animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleDismiss = () => {
    if (!banner) return;

    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      // Save dismissed state to localStorage
      const dismissedBanners = JSON.parse(
        localStorage.getItem('dismissedBanners') || '[]'
      );
      localStorage.setItem(
        'dismissedBanners',
        JSON.stringify([...dismissedBanners, banner.id])
      );
    }, 300);
  };

  if (!banner || isDismissed) return null;

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ease-out ${
        isVisible ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div
        className={`relative bg-gradient-to-r ${
          banner.bgGradient || 'from-blue-600 via-purple-600 to-pink-600'
        } text-white`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-pulse"></div>
        </div>

        <div className="container relative mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Content */}
            <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
              {/* Icon & Title */}
              <div className="flex items-center gap-2 sm:gap-3">
                {banner.icon && (
                  <span className="text-2xl sm:text-3xl" aria-hidden="true">
                    {banner.icon}
                  </span>
                )}
                <div>
                  <h2 className="text-sm font-bold sm:text-base md:text-lg">
                    {banner.title}
                  </h2>
                  <p className="hidden text-xs opacity-90 sm:block md:text-sm">
                    {banner.description}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4 md:text-sm">
                {banner.date && (
                  <div className="flex items-center gap-1.5 opacity-95">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-medium">{banner.date}</span>
                  </div>
                )}
                {banner.location && (
                  <div className="flex items-center gap-1.5 opacity-95">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-medium">{banner.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA & Close Button */}
            <div className="flex items-center gap-2">
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-lg sm:px-4 sm:py-2 sm:text-sm md:gap-2"
              >
                {banner.linkText}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
              </a>
              {/* <button
                onClick={handleDismiss}
                className="rounded-full p-1 transition-colors hover:bg-white/20"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
