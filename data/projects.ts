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
    impact: "Created a centralized platform for .NET developers in Cameroon to connect and share knowledge. The platform has helped bridge the gap between local developers and the global .NET community.",
    role: "Founder & Lead Developer",
    startDate: "2023",
    challenges: [
      "Building a community from scratch in a region with limited .NET presence",
      "Creating an engaging platform that encourages active participation",
      "Managing and moderating community content effectively"
    ],
    achievements: [
      "Successfully launched the first .NET community platform in Cameroon",
      "Organized the first .NET meetup in Cameroon",
      "Built a growing community of over 100 developers"
    ],
    highlights: [
      "Community forum for discussions and knowledge sharing",
      "Event management system for meetups and workshops",
      "Resource library for learning materials",
      "Job board for local opportunities",
      "Blog section for community news and updates"
    ],
    lessons: [
      "The importance of community building in tech ecosystems",
      "How to effectively manage and grow an open-source project",
      "Balancing feature development with community needs"
    ],
    metrics: {
      contributors: 3
    }
  },
  // {
  //   id: "project-2",
  //   title: "Project 2",
  //   description: "Description of project 2",
  //   category: "personal",
  //   technologies: ["React", "Node.js", "MongoDB", "Express", "Docker"],
  //   githubUrl: "https://github.com/djoufson/project-2",
  //   featured: true,
  //   status: "completed",
  //   impact: "A full-stack application that demonstrates modern web development practices and serves as a learning resource for other developers.",
  //   role: "Full Stack Developer",
  //   startDate: "2023",
  //   endDate: "2024",
  //   challenges: [
  //     "Implementing real-time features with WebSocket",
  //     "Optimizing database queries for better performance",
  //     "Setting up a robust CI/CD pipeline"
  //   ],
  //   highlights: [
  //     "Real-time data synchronization",
  //     "Responsive design for all devices",
  //     "Comprehensive API documentation",
  //     "Automated testing suite"
  //   ],
  //   lessons: [
  //     "Best practices for real-time application development",
  //     "Database optimization techniques",
  //     "CI/CD pipeline implementation"
  //   ],
  //   metrics: {
  //     stars: 25,
  //     forks: 10
  //   }
  // },
  // Add more projects here
]; 