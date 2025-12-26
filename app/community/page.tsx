import React from 'react';
import { Metadata } from "next";
import { Users, Code2, Mic, BookOpen, Heart, ExternalLink, Github, Download } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Community",
  description: "Discover Djoufson Che Bene's community engagement, open-source contributions, technical writing, and developer advocacy. Learn how to get involved in the .NET Cameroon community and collaborate on open-source projects.",
  keywords: [
    "Community Engagement",
    "Open Source Contributions",
    "Technical Writing",
    "Developer Advocacy",
    ".NET Cameroon",
    "Community Building",
    "Mentorship",
    "Speaking Engagements"
  ],
  openGraph: {
    title: "Community",
    description: "Discover Djoufson's community engagement, open-source contributions, and developer advocacy.",
    url: "https://djoufson.com/community",
    type: "website",
  },
  twitter: {
    title: "Community",
    description: "Discover Djoufson's community engagement, open-source contributions, and developer advocacy.",
  },
};

export default function Community() {
  const communityStats = [
    { label: "Open Source Projects", value: "7+", icon: Code2 },
    { label: "Community Members", value: "100+", icon: Users },
    { label: "Package Downloads", value: "500+", icon: Download },
    { label: "Blog Articles", value: "5+", icon: BookOpen },
  ];

  const openSourceProjects = [
    {
      name: ".NET Cameroon",
      description: "Community platform for .NET developers in Cameroon",
      role: "Founder & Lead Developer",
      impact: "100+ community members, First .NET meetup in Cameroon",
      link: "https://dotnet.cm",
      github: "https://github.com/dotnetcameroon/website"
    },
    {
      name: "EF Core Seeder Library",
      description: "CLI tool for applying seeders with Entity Framework Core",
      role: "Core Maintainer",
      impact: "200+ downloads on NuGet",
      link: "https://www.nuget.org/packages/EntityFrameworkCore.Seeder",
      github: "https://github.com/djoufson/dotnet-ef-seeder"
    },
    {
      name: "Git Report",
      description: "Go CLI tool for analyzing git commit history and generating reports",
      role: "Core Maintainer",
      impact: "Cross-platform tool for developer productivity",
      github: "https://github.com/djoufson/git-report"
    },
    {
      name: "Blazor SSR Starter Kit",
      description: ".NET template with Blazor SSR and Tailwind CSS",
      role: "Core Maintainer",
      impact: "246+ downloads, Quick project bootstrapping",
      link: "https://www.nuget.org/packages/BlazorSSR.Starter.Kit",
      github: "https://github.com/djoufson/blazorssr-starter-kit"
    },
  ];

  const contentCreation = [
    {
      platform: "Personal Blog",
      description: "Technical articles on .NET, software architecture, and modern development practices",
      link: "/blog"
    },
    {
      platform: "Medium",
      description: "In-depth tutorials and thought pieces on software engineering",
      link: "https://medium.com/@djouflegran"
    },
    {
      platform: ".NET Cameroon Blog",
      description: "Community news, event updates, and knowledge sharing",
      link: "https://dotnet.cm"
    }
  ];

  const speakingAndEvents = [
    {
      title: ".NET Meetup Cameroon",
      role: "Organizer",
      description: "Regular meetups for .NET developers to share knowledge and network"
    },
    {
      title: "Azure Developer Conference",
      role: "Presenter",
      description: "Cloud Native Architecture presentation"
    }
  ];

  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-semibold">Community Engagement</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          Building communities, sharing knowledge, and empowering developers through open source,
          technical writing, and collaborative learning. Community is at the heart of what I do.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              Through regular meetups, workshops, and online engagement, we've built a community
              of over 100 developers who learn from each other, share experiences, and grow together.
            </p>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium mb-1">Community Impact</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Organized the first .NET meetup in Cameroon</li>
                <li>• Built a growing community of 100+ developers</li>
                <li>• Created a centralized platform for collaboration</li>
                <li>• Established a job board for local opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Contributions */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-medium">Open Source Contributions</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Contributing to open source is more than just code—it's about creating tools that
          empower developers, solving real-world problems, and giving back to the community
          that has given so much to me.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {openSourceProjects.map((project) => (
            <div key={project.name} className="border border-border rounded-lg p-6 hover:border-blue-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-lg">{project.name}</h3>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="Visit project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Role:</span>
                  <span className="text-xs text-muted-foreground">{project.role}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium">Impact:</span>
                  <span className="text-xs text-muted-foreground">{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm custom-blue-link"
          >
            View all projects <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Content Creation & Writing */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-medium">Content Creation & Writing</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Sharing knowledge through writing is one of my passions. I regularly publish technical
          articles, tutorials, and insights on software development, architecture, and best practices.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {contentCreation.map((content) => (
            <a
              key={content.platform}
              href={content.link}
              target={content.link.startsWith('http') ? "_blank" : undefined}
              rel={content.link.startsWith('http') ? "noopener noreferrer" : undefined}
              className="block border border-border rounded-lg p-6 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="font-medium mb-2 flex items-center gap-2">
                {content.platform}
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground">{content.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Speaking & Events */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Mic className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-medium">Speaking & Events</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          I enjoy sharing my knowledge and experiences through speaking engagements, workshops,
          and community events. Here are some of the initiatives I've been involved with.
        </p>
        <div className="space-y-4">
          {speakingAndEvents.map((event) => (
            <div key={event.title} className="border-l-4 border-orange-500 pl-6 py-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="font-medium">{event.title}</h3>
                <span className="text-sm text-muted-foreground">{event.role}</span>
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-muted/30 rounded-lg p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-medium mb-4">Let's Build Together</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I'm always excited to collaborate on interesting projects, contribute to meaningful
            open-source initiatives, or speak at events. Whether you want to contribute to one of
            my projects, join the .NET Cameroon community, or just chat about tech, feel free to reach out!
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
