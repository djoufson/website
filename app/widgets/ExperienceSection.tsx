import React from "react";
import JobExperienceCard from "./JobExperienceCard";
import { experiences } from "@/data/experiences";

export default function ExperienceSection() {
  return (
    <section className="section py-16">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-8">Professional Experience</h2>
        <div className="space-y-6">
          {experiences.map((e) => (
            <div key={e.id.toString()}>
              <JobExperienceCard model={e} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
