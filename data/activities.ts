import { Activity } from "@/types/Activity";

// Edit this file to manage what shows in the home activity feed.
// Sorted automatically by date desc (future dates float to the top).
// Keep ~5 active entries; prune older ones when they stop being relevant.

export const activities: Activity[] = [
  {
    id: "dotnet-conf-africa-2026",
    date: "2026-11-15",
    when: "November 2026",
    status: "upcoming",
    tag: "Speaking",
    title: "Hosting .NET Conf Africa",
    description:
      "We're bringing the first pan-African edition of .NET Conf to the continent. Expect tracks on .NET 10, cloud-native architecture, and stories from African .NET teams. Currently lining up speakers and partners — reach out if you want to get involved.",
    location: "Cameroon",
    link: {
      href: "https://dotnet.cm",
      label: "Follow along on .NET Cameroon",
      external: true,
    },
  },
  {
    id: "alice-video-calls",
    date: "2026-05-20",
    when: "In progress",
    status: "ongoing",
    tag: "Building",
    title: "Adding video consultations to Alice Care",
    description:
      "Working on real-time in-app audio/video calls across the web and mobile clients. Tackling SFU vs P2P trade-offs, NAT traversal on flaky networks, and call recording for patient records.",
    link: {
      href: "/projects/alice",
      label: "See the project",
    },
  },
  {
    id: "git-report-release",
    date: "2026-04-02",
    status: "shipped",
    tag: "Open Source",
    title: "Released git-report v1.0",
    description:
      "A Go CLI that scans every local branch and exports commit history to CSV — useful for monthly activity reports and timesheets. Cross-platform binaries are up on the GitHub releases page.",
    link: {
      href: "https://github.com/djoufson/git-report/releases",
      label: "Grab the latest release",
      external: true,
    },
  },
  {
    id: "st-digital-now",
    date: "2026-03-10",
    when: "Ongoing",
    status: "note",
    tag: "Work",
    title: "One year at ST Digital",
    description:
      "Marking a year as a Software Engineer at ST Digital — shipping enterprise backend systems, writing the technical specs that ship them, and learning a ton about cloud transformation in regulated environments.",
  },
  {
    id: "open-to-talks",
    date: "2026-02-01",
    when: "Open now",
    status: "note",
    tag: "Speaking",
    title: "Open to talks, mentoring, and collaborations",
    description:
      "If you're running a conference, a community meetup, or a team workshop on .NET, cloud-native, or building developer communities — let's talk. I'm also taking on a few mentees this year.",
    link: {
      href: "/contact",
      label: "Get in touch",
    },
  },
];
