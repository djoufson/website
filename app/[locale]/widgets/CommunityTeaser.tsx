import { Link } from "@/i18n/routing";
import { Users, Mic, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function CommunityTeaser() {
  const t = await getTranslations('CommunityTeaser');

  return (
    <section className="section py-16">
      <div className="container">
        <div className="bg-muted/30 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-3">{t('heading')}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            {t('description')}
          </p>
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{t('members')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mic className="w-4 h-4 text-orange-500" />
              <span>{t('events')}</span>
            </div>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            {t('learnMore')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
