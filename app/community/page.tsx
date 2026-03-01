import { Metadata } from "next";
import CommunityContent from "./CommunityContent";

export const metadata: Metadata = {
  title: "Community Engagement",
  alternates: { canonical: "/community" },
  description: "Discover Djoufson Che Bene's community engagement, speaking engagements at conferences, workshops, and developer advocacy. Founder of .NET Cameroon, organizing tech meetups and empowering developers across Africa.",
  keywords: [
    "Community Engagement",
    "Developer Advocacy",
    ".NET Cameroon",
    "Tech Meetups",
    "Speaking Engagements",
    "Technical Workshops",
    "Azure Developer Conference",
    "Software Engineering Community",
    "Douala Tech Community",
    "Cameroon Developers",
    "Community Building",
    "Mentorship",
    "Public Speaking",
    "Tech Events"
  ],
  openGraph: {
    title: "Community Engagement - Djoufson Che Bene",
    description: "Building communities, empowering developers through meetups, speaking engagements, and mentorship. Founder of .NET Cameroon community.",
    url: "https://djoufson.com/community",
    type: "website",
    images: [
      {
        url: "/assets/dotnetcameroon_logo.png",
        width: 1200,
        height: 630,
        alt: ".NET Cameroon Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Engagement - Djoufson Che Bene",
    description: "Building communities, empowering developers through meetups, speaking engagements, and mentorship.",
    images: ["/assets/dotnetcameroon_logo.png"],
  },
};

export default function CommunityPage() {
  return <CommunityContent />;
}
