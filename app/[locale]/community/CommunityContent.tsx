"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, Users, Calendar, Award, Mic, MapPin, Heart, Youtube } from "lucide-react"
import LottieAnimation from "@/components/LottieAnimation"
import { Event } from "@/types/Event"
import { speakingAndEvents } from "@/data/events"
import { shimmerBlurDataURL } from "@/lib/image"
import { useTranslations } from "next-intl"

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/") || parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/")[2] ?? null;
      }
    }
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export default function CommunityContent() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const t = useTranslations("Community");

  const communityStats = [
    { label: t('stats.members'), value: "1000+", icon: Users },
    { label: t('stats.events'), value: "5+", icon: Mic },
    { label: t('stats.speaking'), value: "3+", icon: Award },
    { label: t('stats.yearsActive'), value: "2+", icon: Heart },
  ];

  return (
    <div className="container py-16">
      {/* Banner Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-4">{t('heading')}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {t('description')}
          </p>
        </div>
        <LottieAnimation animationPath="/animations/community.json" />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {communityStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.label} className="bg-muted/50 rounded-lg p-4 text-center">
              <IconComponent className="w-5 h-5 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Community Building Section */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-medium">{t('building.heading')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t.rich('building.paragraph1', {
                link: (chunks) => (
                  <a href="https://dotnet.cm" target="_blank" rel="noopener noreferrer" className="custom-blue-link-active">{chunks}</a>
                )
              })}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('building.paragraph2')}
            </p>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-medium mb-1">{t('building.impactHeading')}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• {t('building.impact1')}</li>
                <li>• {t('building.impact2')}</li>
                <li>• {t('building.impact3')}</li>
                <li>• {t('building.impact4')}</li>
                <li>• {t('building.impact5')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking & Events */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Mic className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-medium">{t('speaking.heading')}</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          {t('speaking.description')}
        </p>

        {/* Events List */}
        <div className="space-y-8">
          {speakingAndEvents.map((event) => (
            <article
              key={event.id}
              className="group rounded-lg border transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex flex-col md:flex-row overflow-hidden rounded-lg">
                <div className="relative h-48 md:h-auto w-full md:w-[300px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataURL}
                  />
                </div>

                <div className="p-6 flex flex-col w-full">
                  {/* Status Badge */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge
                      variant={event.status === "ongoing" ? "default" : "secondary"}
                    >
                      {event.status}
                    </Badge>
                    {event.frequency && (
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                        {event.frequency}
                      </span>
                    )}
                    {event.year && (
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                        {event.year}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                    {event.shortDescription}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-dashed w-full">
                    <div className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      <span>{event.role}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location.split(',')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <Badge variant={selectedEvent.status === "ongoing" ? "default" : "secondary"}>
                  {selectedEvent.status}
                </Badge>
              </div>
              <DialogDescription>{selectedEvent.role}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedEvent.thumbnail}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={shimmerBlurDataURL}
                />
              </div>

              {/* Meta Info */}
              {(selectedEvent.location || selectedEvent.startDate || selectedEvent.frequency || selectedEvent.year) && (
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {selectedEvent.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.location}
                    </div>
                  )}
                  {selectedEvent.startDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedEvent.startDate}
                      {selectedEvent.frequency && ` • ${selectedEvent.frequency}`}
                      {selectedEvent.year && ` • ${selectedEvent.year}`}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">{t('dialog.about')}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {t('dialog.highlights')}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {selectedEvent.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              {selectedEvent.links && selectedEvent.links.length > 0 && (
                <div className="flex gap-4">
                  {selectedEvent.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Videos */}
              {selectedEvent.videos && selectedEvent.videos.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    {t('dialog.videos')}
                  </h4>
                  <div className="space-y-4">
                    {selectedEvent.videos.map((video, idx) => {
                      const embedUrl = getYoutubeEmbedUrl(video);
                      if (!embedUrl) return null;
                      return (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                          <iframe
                            src={embedUrl}
                            title={`${selectedEvent.title} - Video ${idx + 1}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 w-full h-full border-0"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">{t('dialog.gallery')}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedEvent.gallery.map((image, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={image}
                          alt={`${selectedEvent.title} - Image ${idx + 1}`}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={shimmerBlurDataURL}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Get Involved */}
      <section className="bg-muted/30 rounded-lg p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-medium mb-4">{t('getInvolved.heading')}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {t('getInvolved.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/djoufson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
              {t('getInvolved.followGithub')}
            </a>
            <a
              href="https://dotnet.cm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              <Users className="w-4 h-4" />
              {t('getInvolved.joinCommunity')}
            </a>
            <a
              href="mailto:djouflegran@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              {t('getInvolved.getInTouch')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
