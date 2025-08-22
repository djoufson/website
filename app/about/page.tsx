import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Djoufson Che Bene, a passionate Full Stack Developer and Software Engineer. Discover my background, experience, skills in React, Next.js, .NET, and journey in software development.",
  keywords: [
    "About Djoufson",
    "Software Engineer Background",
    "Full Stack Developer Experience",
    "Professional Profile",
    "Career Journey",
    "Technical Skills",
    "Software Development Experience"
  ],
  openGraph: {
    title: "About",
    description: "Learn more about Djoufson Che Bene, a passionate Full Stack Developer and Software Engineer.",
    url: "https://djoufson.com/about",
    type: "profile",
  },
  twitter: {
    title: "About",
    description: "Learn more about Djoufson Che Bene, a passionate Full Stack Developer and Software Engineer.",
  },
};

export default function About() {
  return (
    <div className='container'>About</div>
  )
}
