import { Activity } from "@/types/Activity";

// Edit this file to manage what shows in the home activity feed.
// Sorted automatically by date desc (future dates float to the top).
// Keep ~5 active entries; prune older ones when they stop being relevant.

export const activities: Activity[] = [
  {
    id: "dotnet-conf-africa-2026",
    date: "2026-11-24",
    when: "November 2026",
    status: "upcoming",
    tag: "Organizing",
    title: "Hosting .NET Conf Africa",
    description:
      "We're bringing the first pan-African edition of .NET Conf to the continent. Expect tracks on .NET, cloud-native architecture, and stories from African .NET teams. Currently lining up speakers and partners — reach out if you want to get involved.",
    location: "Johannesburg, South Africa",
    image: "/assets/events/net-conf-africa-2026/banner.jpg",
    link: {
      href: "https://sessionize.com/net-africa-conference-2026",
      label: "Submit a Session",
      external: true,
    },
  },
  {
    id: "building-utauro",
    date: "2026-12-11",
    when: "In progress",
    status: "ongoing",
    tag: "Building",
    title: "Building Utauro",
    description:
      "I'm currently building Utauro — a local-first, privacy-focused macOS app that automatically tracks how you spend time on your Mac. No timers or manual tagging: it quietly records app and document usage, then breaks your day down into meaningful activity categories, all stored on-device. Waitlist is open.",
    link: {
      href: "https://utauro.app",
      label: "Join The Waitlist",
      external: true,
    },
  }
];
