import { JobExperience } from "@/types/JobExperience";

export const experiences: JobExperience[] = [
  {
    id: 0,
    company: "Africa Global Logistics",
    website: "https://www.aglgroup.com",
    logo: "/assets/agl.png",
    jobDescription:
      "A leading logistics operator in Africa, providing integrated transport, port, and supply chain solutions across the continent",
    roles: [
      {
        jobTitle: "Software Engineer",
        start: new Date(2026, 6, 1),
        responsibilities: [
          "Building and maintaining software solutions to support logistics operations",
          "Collaborating with cross-functional teams to deliver reliable systems",
        ],
      },
    ],
  },
  {
    id: 1,
    company: "ST Digital",
    website: "https://st.digital",
    logo: "/assets/st-digital.png",
    jobDescription:
      "A digital services company aiming to lead in digital transformation and cloud services",
    roles: [
      {
        jobTitle: "Software Engineer II",
        start: new Date(2026, 1, 1),
        end: new Date(2026, 6, 1),
        responsibilities: [
          "Led the implementation of products end to end",
          "Designed complex architectures and workflows",
          "Managed team members and owned the quality of the outcome",
          "Managed deadlines and client communication",
          "Mentored interns"
        ],
      },
      {
        jobTitle: "Software Engineer",
        start: new Date(2025, 1, 1),
        end: new Date(2026, 1, 1),
        responsibilities: [
          "Explored a wide range of topics, from frontend to backend, AI and design",
          "Maintained legacy .NET applications",
          "Built real-world projects with Next.js",
          "Designed a complete website in Figma",
          "Adopted agent-based workflows with modern AI tools",
          "Wrote technical documents",
        ],
      },
    ],
  },
  {
    id: 2,
    company: "L'Agence Digitale",
    website: "https://l-agence.digital",
    logo: "/assets/agence-digitale.png",
    jobDescription: "IT solutions development firm",
    roles: [
      {
        jobTitle: ".NET Developer",
        start: new Date(2024, 2, 1),
        end: new Date(2025, 2, 1),
        responsibilities: [
          "Performed migration of legacy .NET Applications from .NET Core 3.1 to .NET 8",
          "Maintained legacy applications",
        ],
      },
    ],
  },
  {
    id: 3,
    company: "Infinite Solutions SARL",
    website: "https://isolutions-intl.com",
    logo: "/assets/infinite-solutions.png",
    jobDescription: "IT solutions development firm",
    roles: [
      {
        jobTitle: "Mobile Developer",
        start: new Date(2022, 2, 1),
        end: new Date(2024, 2, 1),
        responsibilities: [
          "Learnt .NET MAUI to build robust cross platform mobile applications",
          "Built Desktop applications with Windows Forms",
          "Built APIs with ASP.NET Core",
        ],
      },
    ],
  },
  {
    id: 4,
    company: "C-Dreams",
    website: "https://github.com/cdreams-gamedev",
    logo: "/assets/c-dreams.png",
    jobDescription: "C-Dream is a Cameroonian team of game developers",
    roles: [
      {
        jobTitle: "Game Developer Intern",
        start: new Date(2021, 2, 1),
        end: new Date(2022, 2, 1),
        responsibilities: ["Learnt Unity3D"],
      },
    ],
  },
];
