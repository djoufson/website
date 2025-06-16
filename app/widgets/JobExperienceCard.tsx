import { JobExperience } from "@/types/JobExperience";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function JobExperienceCard({ model }: JobExperienceProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 py-4 border-b border-border last:border-0">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
          <a
            className="inline-flex items-center gap-2 text-foreground hover:text-blue-600 transition-colors"
            target="_blank"
            href={model.website}
          >
            <Link className="w-4 h-4" />
            <span className="font-medium">{model.jobTitle}</span>
            <span className="text-muted-foreground">at {model.company}</span>
          </a>
          <span className="text-sm text-muted-foreground">
            {model.start.getFullYear()} - {model.end ? model.end.getFullYear() : 'Present'}
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{model.jobDescription}</p>
        <ul className="space-y-2">
          {model.responsibilities.map((r, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground mt-1">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-shrink-0">
        <a
          href={model.website}
          target="_blank"
          className="block"
        >
          <Image
            src={model.logo}
            alt={`${model.company}'s Logo`}
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
        </a>
      </div>
    </div>
  );
}

export interface JobExperienceProps {
  model: JobExperience;
}
