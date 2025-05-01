import { JobExperience } from "@/types/JobExperience";
import React from "react";
import JobExperienceCard from "./JobExperienceCard";

const experiences: JobExperience[] = [
  {
    id: 1,
    company: "ST Digital",
    website: "https://st.digital",
    logo: "/assets/st-digital.png",
    jobTitle: "Software Engineer",
    jobDescription:
      "A digital services company aiming to lead in digital transformation and cloud services",
    start: new Date(2025, 2, 1),
    responsibilities: [
      "Building enterprise level backend systems",
      "Exchanging with customers to ensure the solutions we provide fit their needs",
      "Writing technical documents and requirements papers",
    ],
  },
  {
    id: 2,
    company: "L'Agence Digitale",
    website: "https://l-agence.digital",
    logo: "/assets/agence-digitale.png",
    jobTitle: ".NET Developer",
    jobDescription: "IT solutions development firm",
    start: new Date(2024, 2, 1),
    end: new Date(2025, 2, 1),
    responsibilities: [
      "Performed migration of legacy .NET Applications from .NET Core 3.1 to .NET 8",
      "Maintained legacy applications",
    ],
  },
  {
    id: 3,
    company: "Infinite Solutions SARL",
    website: "https://isolutions-intl.com",
    logo: "/assets/infinite-solutions.png",
    jobTitle: "Mobile Developer",
    jobDescription: "IT solutions development firm",
    start: new Date(2022, 2, 1),
    end: new Date(2024, 2, 1),
    responsibilities: [
      "Learnt .NET MAUI to build robust cross platform mobile applications",
      "Built Desktop applications with Windows Forms",
      "Built APIs with ASP.NET Core",
    ],
  },
  {
    id: 4,
    company: "C-Dreams",
    website: "https://github.com/cdreams-gamedev",
    logo: "/assets/c-dreams.png",
    jobTitle: "Game Developer Intern",
    jobDescription: "C-Dream is a Cameroonian team of game developers",
    start: new Date(2021, 2, 1),
    end: new Date(2022, 2, 1),
    responsibilities: ["Learnt Unity3DLearnt Unity3D"],
  },
];

export default function ExperienceSection() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title underlined">Professional Experience</h1>
        <ul>
          {experiences.map((e) => (
            <li key={e.id.toString()}>
              <JobExperienceCard model={e} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
