import React from "react";
import JobExperienceCard from "./JobExperienceCard";
import { experiences } from "@/data/experiences";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ExperienceSection() {
  const t = await getTranslations('Experience');
  const locale = await getLocale();

  return (
    <section className="section py-16">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-8">{t('heading')}</h2>
        <div className="space-y-6">
          {experiences.map((e) => (
            <div key={e.id.toString()}>
              <JobExperienceCard
                model={e}
                locale={locale}
                translations={{
                  present: t('present'),
                  current: t('current'),
                  promoted: t('promoted'),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
