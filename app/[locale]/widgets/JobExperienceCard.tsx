import { JobExperience, JobRole } from "@/types/JobExperience";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

function formatMonthYear(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
}

export default function JobExperienceCard({ model, locale, translations }: JobExperienceProps) {
  const roles = model.roles;
  const latest = roles[0];
  const oldest = roles[roles.length - 1];
  const hasProgression = roles.length > 1;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 py-4 border-b border-border last:border-0">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
          <a
            className="inline-flex items-center gap-2 text-foreground custom-blue-link"
            target="_blank"
            href={model.website}
          >
            <Link className="w-4 h-4" />
            <span className="font-medium">{model.company}</span>
          </a>
          <span className="text-sm text-muted-foreground">
            {oldest.start.getFullYear()} -{" "}
            {latest.end ? latest.end.getFullYear() : translations.present}
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{model.jobDescription}</p>

        <div className={hasProgression ? "relative pl-6" : ""}>
          {hasProgression && (
            <span
              className="absolute left-[3px] top-2 bottom-2 w-px bg-border"
              aria-hidden
            />
          )}
          <div className="space-y-5">
            {roles.map((role, index) => (
              <RoleEntry
                key={index}
                role={role}
                locale={locale}
                showTimeline={hasProgression}
                isCurrent={index === 0}
                isLatest={index === 0}
                translations={translations}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <a href={model.website} target="_blank" className="block">
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

function RoleEntry({
  role,
  locale,
  showTimeline,
  isCurrent,
  isLatest,
  translations,
}: {
  role: JobRole;
  locale: string;
  showTimeline: boolean;
  isCurrent: boolean;
  isLatest: boolean;
  translations: JobExperienceProps["translations"];
}) {
  return (
    <div className="relative">
      {showTimeline && (
        <span
          className={`absolute -left-6 top-1.5 w-[7px] h-[7px] rounded-full ring-4 ring-background ${
            isCurrent ? "bg-foreground" : "bg-muted-foreground/40"
          }`}
          aria-hidden
        />
      )}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-medium">{role.jobTitle}</span>
        {showTimeline && isLatest && !role.end && (
          <span className="text-[11px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded bg-foreground/10 text-foreground">
            {translations.current}
          </span>
        )}
        {showTimeline && isLatest && role.end && (
          <span className="text-[11px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded bg-foreground/10 text-foreground">
            {translations.promoted}
          </span>
        )}
        <span className="text-sm text-muted-foreground">
          {formatMonthYear(role.start, locale)} -{" "}
          {role.end ? formatMonthYear(role.end, locale) : translations.present}
        </span>
      </div>
      <ul className="space-y-2 mt-2">
        {role.responsibilities.map((r, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="text-muted-foreground mt-1">•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface JobExperienceProps {
  model: JobExperience;
  locale: string;
  translations: {
    present: string;
    current: string;
    promoted: string;
  };
}
