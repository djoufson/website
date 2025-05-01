import { JobExperience } from "@/types/JobExperience";
import { Link } from "lucide-react";
import React from "react";

export default function JobExperienceCard({ model }: JobExperienceProps) {
  return (
    <div className="flex justify-between gap-2 mb-5">
      <div>
        <div className="flex gap-5 mb-2">
          <a
            className="link flex gap-2"
            target="__blank"
            href={model.website}
          >
            <Link width={15} />
            <span className="font-bold">{model.jobTitle}</span>
            {model.company}
          </a>
          <span>
            ({model.start.getFullYear()} - {model.end ? model.end.getFullYear() : 'Present'})
          </span>
        </div>
        <p>{model.jobDescription}</p>
        <ul className="pl-5">
          {model.responsibilities.map(r => (
            <li className="list list-disc" key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <div>
        <a href={model.website} target="__blank">
          <img
            className="w-20"
            src={model.logo}
            alt={`${model.company}'s Logo`}
          />
        </a>
      </div>
    </div>
  );
}

export interface JobExperienceProps {
  model: JobExperience;
}
