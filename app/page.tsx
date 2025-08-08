import HomeContent from "./widgets/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Djoufson Che Bene's portfolio. Full Stack Developer specializing in React, Next.js, .NET, and modern web technologies. Discover my projects, experience, and technical insights.",
  openGraph: {
    title: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
    description: "Welcome to my portfolio. Full Stack Developer specializing in React, Next.js, .NET, and modern web technologies.",
    url: "https://djoufson.com",
    type: "website",
  },
  twitter: {
    title: "Djoufson Che Bene - Full Stack Developer & Software Engineer", 
    description: "Welcome to my portfolio. Full Stack Developer specializing in React, Next.js, .NET, and modern web technologies.",
  },
};

export default function Home() {
  return (
    <HomeContent/>
  );
}
