"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, Users, Calendar, Award, Mic, MapPin, Heart } from "lucide-react"
import LottieAnimation from "@/components/LottieAnimation"

interface Event {
  id: number;
  title: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  frequency?: string;
  year?: string;
  location?: string;
  startDate?: string;
  thumbnail: string;
  gallery?: string[];
  highlights?: string[];
  links?: { label: string; url: string }[];
  status: 'ongoing' | 'completed' | 'upcoming';
}

export default function CommunityContent() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const communityStats = [
    { label: "Community Members", value: "1000+", icon: Users },
    { label: "Events Organized", value: "5+", icon: Mic },
    { label: "Speaking Engagements", value: "3+", icon: Award },
    { label: "Years Active", value: "2+", icon: Heart },
  ];

  const speakingAndEvents: Event[] = [
    {
      id: 1,
      title: ".NET Conf 2025",
      role: "Organizer",
      shortDescription: "Local edition of .NET Conf featuring .NET 10 and the latest ecosystem updates",
      fullDescription: "Organized the .NET Conf 2025 local edition at Serena Hotel Douala, continuing our tradition of bringing world-class .NET content to Cameroon's developer community. The conference explored .NET 10, the latest advancements in the .NET ecosystem, and provided hands-on learning experiences. Developers gathered for a full day of learning, networking, and celebrating the vibrant .NET community in Cameroon.",
      year: "2025",
      location: "Serena Hotel Douala, Cameroon",
      startDate: "2025",
      thumbnail: "/assets/events/net-conf-2025/netconf-2025.jpg",
      gallery: [
        "/assets/events/net-conf-2025/image-1.jpeg",
        "/assets/events/net-conf-2025/image-2.jpeg",
        "/assets/events/net-conf-2025/image-3.jpeg",
      ],
      status: "completed",
      highlights: [
        "Featured the latest .NET 10 innovations and features",
        "Hosted at the prestigious Serena Hotel Douala",
        "Multiple technical sessions and hands-on workshops",
        "Brought together the growing .NET Cameroon community"
      ],
      links: [
        { label: "Event Details", url: "https://dotnet.cm/dotnet-conf-2025" },
        { label: "Visit .NET Cameroon", url: "https://dotnet.cm" }
      ]
    },
    {
      id: 4,
      title: "Cameroon International Tech Summit",
      role: "Speaker",
      shortDescription: "Presented on AI-Driven Development and how developers should adapt to the AI revolution",
      fullDescription: "Spoke at the Cameroon International Tech Summit 2024, one of sub-Saharan Africa's largest bilingual tech conferences at Palais des Congrès in Yaoundé. My session focused on AI-Driven Development, exploring how artificial intelligence is fundamentally transforming the software development landscape and providing practical insights on how developers should react and adapt to this paradigm shift. The presentation addressed the evolving role of developers in an AI-augmented world, strategies for leveraging AI tools effectively, and the critical skills developers need to remain relevant and thrive in this new era of software engineering. This three-day summit brought together thousands of participants including startups, investors, policymakers, and tech professionals from across Africa and beyond.",
      year: "2024",
      location: "Palais des Congrès Yaoundé, Cameroon",
      startDate: "2024",
      thumbnail: "/assets/events/cits/cits.JPEG",
      gallery: [
        "/assets/events/cits/image-1.jpeg",
        "/assets/events/cits/image-2.jpeg",
        "/assets/events/cits/image-3.jpeg",
        "/assets/events/cits/image-4.jpeg",
        "/assets/events/cits/image-5.jpeg",
      ],
      status: "completed",
      highlights: [
        "Session on AI-Driven Development and the future of software engineering",
        "Explored how developers should adapt to the AI revolution",
        "Discussed practical strategies for leveraging AI tools in development",
        "One of sub-Saharan Africa's largest bilingual tech conferences"
      ],
      links: [
        { label: "Event Website", url: "https://citscm.com" }
      ]
    },
    {
      id: 2,
      title: ".NET Conf 2024",
      role: "Organizer",
      shortDescription: "Local edition of the global .NET Conf focusing on .NET 9 and Aspire",
      fullDescription: "Organized the local .NET Conf 2024 event in Douala, bringing the global .NET conference experience to Cameroon. The event showcased the latest features in .NET 9 and explored .NET Aspire, Microsoft's opinionated stack for building cloud-native applications. Developers gathered to learn about the newest innovations in the .NET ecosystem and how to leverage them in their projects.",
      year: "2024",
      location: "Codec Douala, Cameroon",
      startDate: "2024",
      thumbnail: "/assets/events/net-conf-2024/image-1.jpeg",
      gallery: [
        "/assets/events/net-conf-2024/image-1.jpeg",
        "/assets/events/net-conf-2024/image-2.jpeg",
      ],
      status: "completed",
      highlights: [
        "Local edition of the global .NET Conf event",
        "Deep dive into .NET 9 features and improvements",
        "Introduction to .NET Aspire for cloud-native development",
        "Connected local developers with the global .NET community"
      ],
      links: [
        { label: "Event Details", url: "https://dotnet.cm/dotnet-conf-2024" },
        { label: "Visit .NET Cameroon", url: "https://dotnet.cm" }
      ]
    },
    {
      id: 3,
      title: "Infinite Days 2023",
      role: "Organizer & Speaker",
      shortDescription: "Conference focused on new technologies and tech team management strategies",
      fullDescription: "Organized and spoke at Infinite Days 2023, a comprehensive conference bringing together tech professionals to explore emerging technologies and best practices in tech team management. The event featured multiple sessions covering modern development practices, leadership in tech teams, and the latest technological innovations shaping the industry.",
      year: "2023",
      location: "Active Space Douala, Cameroon",
      startDate: "2023",
      thumbnail: "/assets/events/infinite-days/infinite-days.jpeg",
      gallery: [
        "/assets/events/infinite-days/image-1.jpeg",
        "/assets/events/infinite-days/image-2.jpeg",
        "/assets/events/infinite-days/image-3.jpeg",
        "/assets/events/infinite-days/image-4.jpeg",
        "/assets/events/infinite-days/image-5.jpeg",
        "/assets/events/infinite-days/image-6.jpeg",
        "/assets/events/infinite-days/image-7.jpeg",
        "/assets/events/infinite-days/image-8.jpeg",
        "/assets/events/infinite-days/image-9.jpeg",
        "/assets/events/infinite-days/image-10.jpeg",
        "/assets/events/infinite-days/image-11.jpeg",
      ],
      status: "completed",
      highlights: [
        "Explored emerging technologies and their practical applications",
        "Shared insights on effective tech team management",
        "Brought together local tech community at Active Space Douala",
        "Facilitated knowledge sharing and networking among developers"
      ],
      links: [
        { label: "Visit .NET Cameroon", url: "https://dotnet.cm" }
      ]
    }
  ];

  return (
    <div className="container py-16">
      {/* Banner Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Community Engagement</h1>
          <p className="text-muted-foreground leading-relaxed">
            Building communities, empowering developers, and fostering collaboration through
            meetups, speaking engagements, and mentorship. Community is at the heart of what I do.
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
          <h2 className="text-2xl font-medium">Community Building</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I founded <a href="https://dotnet.cm" target="_blank" rel="noopener noreferrer" className="custom-blue-link-active">.NET Cameroon</a> to
              create a thriving ecosystem for .NET developers in Cameroon. The platform serves as a
              hub for knowledge sharing, networking, and collaborative growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through regular meetups, workshops, and online engagement, we&apos;ve built a community
              of over 100 developers who learn from each other, share experiences, and grow together.
            </p>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-medium mb-1">Community Impact</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Organized the first .NET meetup in Cameroon</li>
                <li>• Built a growing community of 100+ developers</li>
                <li>• Created a centralized platform for collaboration</li>
                <li>• Established a job board for local opportunities</li>
                <li>• Mentored junior developers in their career growth</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking & Events */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Mic className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-medium">Speaking & Events</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          I actively share knowledge through speaking engagements, workshops, and community events.
          From organizing local meetups to presenting at conferences, I&apos;m passionate about helping
          developers learn and grow.
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

            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedEvent.thumbnail}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
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
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Highlights
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

              {/* Image Gallery */}
              {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Gallery</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedEvent.gallery.map((image, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={image}
                          alt={`${selectedEvent.title} - Image ${idx + 1}`}
                          fill
                          className="object-cover"
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
          <h2 className="text-2xl font-medium mb-4">Let&apos;s Build Together</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I&apos;m always excited to collaborate on interesting projects, speak at events, or mentor
            developers. Whether you want to join the .NET Cameroon community, invite me to speak
            at your event, or just chat about tech, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/djoufson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
              Follow on GitHub
            </a>
            <a
              href="https://dotnet.cm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              <Users className="w-4 h-4" />
              Join .NET Cameroon
            </a>
            <a
              href="mailto:djouflegran@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
