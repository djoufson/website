import Image from "next/image";
import { Github, Linkedin, Mail, Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section className="section py-16">
      <div className="container">
        <div className="md:flex md:gap-12 items-center">
          <div className="relative">
            <Image
              src="/djouf.png"
              alt={t('avatarAlt')}
              width={280}
              height={280}
              className="rounded-lg"
              priority
            />
          </div>
          <div className="md:w-[calc(100%-300px)] mt-8 md:mt-0">
            <h1 className="text-3xl font-semibold mb-3">
              {t('greeting')}
            </h1>
            <p className="text-muted-foreground mb-6">{t('role')}</p>
            <p className="text-base leading-relaxed mb-8">
              {t.rich('bio', {
                link: (chunks) => (
                  <a
                    className="custom-blue-link-active"
                    title=".NET Cameroon Website"
                    target="_blank"
                    href="https://dotnet.cm"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/djoufson"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={t('githubTitle')}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/djoufson"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={t('linkedinTitle')}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:djouflegran@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={t('emailTitle')}
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://medium.com/@djouflegran"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={t('mediumTitle')}
              >
                <Pencil className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
