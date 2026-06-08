import Image from "next/image";
import { Link } from "@/i18n/routing";
import { activities } from "@/data/activities";
import { Activity, ActivityStatus } from "@/types/Activity";
import { formatDate } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, MapPin } from "lucide-react";

const MAX_ITEMS = 5;

export default async function ActivitySection() {
  const t = await getTranslations("Activity");
  const locale = await getLocale();

  const statusLabels: Record<ActivityStatus, string> = {
    upcoming: t("status.upcoming"),
    ongoing: t("status.ongoing"),
    shipped: t("status.shipped"),
    note: t("status.note"),
  };

  const items = [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_ITEMS);

  if (items.length === 0) return null;

  return (
    <section className="section py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{t("heading")}</h2>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <ol className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="py-5 first:pt-0 last:pb-0">
              <ActivityCard
                item={item}
                locale={locale}
                statusLabel={statusLabels[item.status]}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ActivityCard({
  item,
  locale,
  statusLabel,
}: {
  item: Activity;
  locale: string;
  statusLabel: string;
}) {
  const when = item.when ?? formatDate(item.date, locale);
  const linkIsExternal = item.link?.external ?? false;

  const metaParts = [statusLabel, when, item.tag].filter(Boolean);

  return (
    <article className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-2">
          {metaParts.join(" · ")}
        </p>

        <h3 className="text-base font-medium mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>

        {(item.location || item.link) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {item.location && (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </span>
            )}
            {item.link &&
              (linkIsExternal ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.link.label}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href={item.link.href}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.link.label}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ))}
          </div>
        )}
      </div>

      {item.image && (
        <div className="relative w-full md:w-32 md:h-20 h-32 flex-shrink-0 rounded-md overflow-hidden border">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 128px"
          />
        </div>
      )}
    </article>
  );
}
