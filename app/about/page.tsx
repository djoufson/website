import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
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
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-6">About Me</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              I'm a passionate Full Stack Developer and Software Engineer with a deep love for creating 
              meaningful digital experiences. My journey in software development has been driven by 
              curiosity, continuous learning, and the desire to solve real-world problems through 
              innovative technology solutions.
            </p>
            <p>
              With expertise spanning from frontend frameworks like React and Next.js to backend 
              technologies including .NET and Node.js, and mobile development with Flutter and 
              .NET MAUI, I enjoy working across the entire technology stack. I believe in writing 
              clean, maintainable code and building applications that not only function well but 
              also provide exceptional user experiences across web and mobile platforms.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge through technical writing. I'm always excited to 
              collaborate on innovative projects and connect with fellow developers in the community.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Core Technologies</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">.NET & C#</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">React & Next.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm">Software Architecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Cloud Technologies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Flutter & Dart</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Focus Areas</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-sm text-muted-foreground">Full Stack Web Development</li>
              <li className="text-sm text-muted-foreground">Cross-Platform Mobile Development</li>
              <li className="text-sm text-muted-foreground">Modern Frontend Architecture</li>
              <li className="text-sm text-muted-foreground">API Design & Development</li>
              <li className="text-sm text-muted-foreground">Cloud Solutions & DevOps</li>
              <li className="text-sm text-muted-foreground">Technical Writing & Mentoring</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Let's Connect</h3>
            <div className="space-y-2">
              <a 
                href="mailto:djouflegran@gmail.com" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                📧 djouflegran@gmail.com
              </a>
              <a 
                href="https://linkedin.com/in/djoufson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                🔗 LinkedIn
              </a>
              <a 
                href="https://github.com/djoufson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                💻 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
