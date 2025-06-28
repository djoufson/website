import { Project } from "@/types/Project";

export const projects: Project[] = [
  {
    id: "dotnet-cameroon",
    title: ".NET Cameroon",
    description:
      "A community platform for .NET developers in Cameroon, fostering knowledge sharing and collaboration.",
    category: "open-source",
    technologies: ["Blazor SSR", "Tailwind CSS"],
    githubUrl: "https://github.com/dotnetcameroon/website",
    imageUrl: "/assets/dotnetcameroon_logo.png",
    liveUrl: "https://dotnet.cm",
    featured: true,
    status: "active",
    impact:
      "Created a centralized platform for .NET developers in Cameroon to connect and share knowledge. The platform has helped bridge the gap between local developers and the global .NET community.",
    role: "Founder & Lead Developer",
    startDate: "2023",
    challenges: [
      "Building a community from scratch in a region with limited .NET presence",
      "Creating an engaging platform that encourages active participation",
      "Managing and moderating community content effectively",
    ],
    achievements: [
      "Successfully launched the first .NET community platform in Cameroon",
      "Organized the first .NET meetup in Cameroon",
      "Built a growing community of over 100 developers",
    ],
    highlights: [
      "Community forum for discussions and knowledge sharing",
      "Event management system for meetups and workshops",
      "Resource library for learning materials",
      "Job board for local opportunities",
      "Blog section for community news and updates",
    ],
    lessons: [
      "The importance of community building in tech ecosystems",
      "How to effectively manage and grow an open-source project",
      "Balancing feature development with community needs",
    ],
    metrics: {
      contributors: 3,
    },
  },
  {
    id: "dotnet-ef-seeder",
    title: "EF Core Seeder Library",
    description:
      "A cli tool for applying seeders against a database using Entity Framework Core and Bogus",
    category: "open-source",
    technologies: ["C#"],
    githubUrl: "https://github.com/djoufson/dotnet-ef-seeder",
    imageUrl: "/assets/ef-core-seeder.jpeg",
    liveUrl:
      "https://www.nuget.org/packages/EntityFrameworkCore.Seeder/#readme-body-tab",
    featured: true,
    status: "active",
    impact:
      "Created a tool for applying Seeder in a developer's convenient way, that uses Ef Core and Bogus to apply seeders on demand",
    role: "Core Maintainer",
    startDate: "2024",
    challenges: [
      "Integrate with Ef Core",
      "Make an intuitive & convenient API for developers",
      "Manage releases and bug fixes",
    ],
    achievements: ["Reached 200+ downloads"],
    highlights: [
      "Generate meaningful sets of fake data using Bogus",
      "Apply your seeders sequentially and on-demand",
      "Decouple business code from data pre-population",
      "Enhance maintainability by using C# code instead of raw sql scripts for populating the database",
      "Leverage EF Core capabilities",
    ],
    metrics: {
      contributors: 1,
      downloads: 241,
    },
  },
  {
    id: "inference-engine",
    title: "Forward Chaining Inference Engine",
    description:
      "This project is a C# class Library made with .NET 6+, that solves inference problems with an engine running the forward chaining algorithm.",
    category: "open-source",
    technologies: ["C#"],
    githubUrl: "https://github.com/djoufson/Inference-Engine",
    imageUrl: "/assets/inference-engine.png",
    featured: true,
    status: "active",
    impact:
      "Easily provide basic reasoning capabilities to your C# application by integrating this forward chaining C# Inference Engine",
    role: "Core Maintainer",
    startDate: "2022",
    challenges: [
      "Implement the Forward Chaining algorithm",
      "Make an intuitive & convenient API for developers to create Rules and Facts sets",
      "Manage releases and bug fixes",
      "Make a comprehensive facts and computing process",
    ],
    achievements: [
      "Successfully implemented the algorithm",
      "Made a reliable library",
    ],
    highlights: [
      "Build the engine rules set by code",
      "Infer to the most deep fact possible",
      "Strongly typed and convenient API for developers",
    ],
    metrics: {
      contributors: 1,
    },
  },
  {
    id: "blazor-ssr-starter-kit",
    title: "Blazor SSR Starter Kit",
    description:
      "A .NET template that bootstraps your Blazor SSR journey by providing a ready to go project structure that includes Tailwind CSS",
    category: "open-source",
    technologies: ["Blazor SSR", "Tailwind CSS"],
    githubUrl: "https://github.com/djoufson/blazorssr-starter-kit",
    imageUrl: "/assets/tailwindcss.png",
    featured: true,
    liveUrl: "https://www.nuget.org/packages/BlazorSSR.Starter.Kit",
    status: "active",
    impact:
      "Provide a quick boilerplate Blazor SSR project that gets rid of Bootstrap and use Tailwind CSS by default",
    role: "Core Maintainer",
    startDate: "2022",
    challenges: ["Implement a customizable project template"],
    achievements: [
      "Successfully implemented the algorithm",
      "Made a reliable library",
    ],
    highlights: [
      "Benefit from a quick project boilerplate",
      "Tailwind CSS pre-installed",
    ],
    lessons: [
      "Learnt how to build project templates in .NET",
      "Learnt how to install custom project templates and provide new ones on NuGet",
    ],
    metrics: {
      contributors: 1,
      downloads: 246,
    },
  },
  {
    id: "alice",
    title: "Alice Care",
    description:
      "Alice Care is a SAAS that helps people to find qualified doctors in times and benefit from online consultations",
    category: "personal",
    technologies: ["ASP.NET Core", "SQL Server", ".NET MAUI", "Next.JS"],
    featured: true,
    liveUrl: "https://alice.djoufson.com",
    imageUrl: "/assets/alice.png",
    status: "building",
    impact:
      "A mobile - web cross-platform platform that solves the problem of time care quality online consultations",
    role: "Founder & Maintainer",
    startDate: "2024",
    challenges: [
      "Implement in-app audio/video calls accros mobile and web clients",
      "Implement realtime messaging support and file transfert",
      "Setting up a robust CI/CD pipeline",
    ],
    highlights: [
      "Real-time data synchronization",
      "Responsive design for all devices",
      "Intuitive user-friendly interface",
    ],
    lessons: [
      "Best practices for real-time application development",
      "Database optimization techniques",
      "CI/CD pipeline implementation",
    ],
    metrics: {
      contributors: 1,
      users: 5,
    },
  },
  {
    id: "check-games-engine",
    title: "Check Game Engine",
    description: "A golang implementation of the Check Game",
    category: "personal",
    technologies: ["Go"],
    featured: true,
    githubUrl: "https://github.com/djoufson/check-games-engine",
    imageUrl: "/assets/cards.jpg",
    status: "active",
    impact:
      "The Check Game is a Cameroonian cards game where the goal is to empty our hand, based on specific rules. This project is the basic building bloc of an online multiplayer Check Game",
    role: "Core Maintainer",
    startDate: "2024",
    challenges: [
      "Learn Golang by practice",
      "Make a testable software",
      "Implement complex rules game scenarios",
    ],
    highlights: [
      "Comprehensive library that encapsulates the Check Game rules and game management",
      "Enhanced portability - Can be integrated with C/C++ and interoped in C# or other languages",
      "100% test coverage",
    ],
    lessons: ["Low level Go programming"],
    metrics: {
      contributors: 1,
    },
  },
  {
    id: "cloud-native-architecture",
    title: "Cloud Native Architecture Thesis",
    description:
      "A comprehensive research about how to apply Cloud Native principles to build large and complex applications hosted in Microsoft Azure. Real world example on an online consultation platform built with C# .NET",
    category: "academic",
    technologies: ["Azure", "GitHub Actions", "Jira"],
    featured: true,
    imageUrl: "/assets/azure.png",
    status: "completed",
    impact:
      "Showcased how Cloud Native architecture can enhance software development building, robustness and confident deployments",
    role: "Lead Researcher",
    startDate: "2023",
    endDate: "2024",
    challenges: [
      "Designing scalable microservices architectures for Azure",
      "Implementing CI/CD pipelines with GitHub Actions",
      "Managing complex distributed systems in cloud environments",
      "Optimizing cost and performance in Azure services",
    ],
    achievements: [
      "Completed Engineering Degree thesis with distinction",
      "Presented a comprehensive way to understand Cloud Native concepts",
      "Created a robust application",
    ],
    highlights: [
      "Comprehensive analysis of Azure cloud-native services",
      "Implementation of automated CI/CD pipelines",
      "High observability with Open Telemetry",
      "Cost optimization strategies for Azure deployments",
      "Security best practices for cloud-native applications",
    ],
    lessons: [
      "Advanced cloud-native architecture principles",
      "Azure service integration and optimization",
      "DevOps practices with GitHub Actions",
      "Agile project management with JIRA",
    ],
    metrics: {
      contributors: 1,
    },
    downloads: [
      {
        name: "Master's Thesis - Cloud Native Architecture",
        url: "/documents/thesis.pdf",
        type: "pdf",
        description: "Complete master's thesis on cloud-native architecture",
      },
      {
        name: "Project Specifications",
        url: "/documents/alice-specifications.pdf",
        type: "zip",
        description:
          "The requirements of Alice, the illustrative project of this Architecture",
      },
      {
        name: "Azure Cloud Architecture",
        url: "/documents/alice-cloud-architecture.pdf",
        type: "pdf",
        description: "Azure Developer Conference presentation slides",
      },
    ],
  },
  {
    id: "booky",
    title: "Microservices Orchestration - Booky",
    description:
      "Booky is a theoretical and practical exploration of distributed systems design patterns, focusing on fault tolerance and scalability in microservices architectures.",
    category: "academic",
    technologies: ["Kubernetes", "Docker", "Aspire", ".NET"],
    featured: true,
    imageUrl: "/assets/cards.jpg",
    status: "completed",
    githubUrl: "https://github.com/djoufson/booky",
    role: "Principal Investigator",
    startDate: "2022",
    endDate: "2023",
    challenges: [
      "Understanding deployment process of Microservices",
      "Understanding concepts like containerization, orchestration, auto scalability",
      "Design complex systems with loosely coupling strategies",
    ],
    achievements: [
      "Setup a complete Kubernetes cluster",
      "Alternatively setup an easy to run Aspire orchestration system",
      "Leverage Aspire Dashboard for observability with Open Telemetry standards",
    ],
    lessons: [
      "Advanced distributed systems concepts",
      "Academic research and writing skills",
      "Performance optimization in distributed environments",
    ],
    metrics: {
      contributors: 1,
    },
  },
  // Add more projects here
];