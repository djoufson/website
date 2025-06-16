import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section py-16">
      <div className="container">
        <div className="md:flex md:gap-12 items-center">
          <div className="relative">
            <Image
              src="/djouf.png"
              alt="Djoufson's Avatar"
              width={280}
              height={280}
              className="rounded-lg"
              priority
            />
          </div>
          <div className="md:w-[calc(100%-300px)] mt-8 md:mt-0">
            <h1 className="text-3xl font-semibold mb-3">Hi, I am Djoufson Che</h1>
            <p className="text-muted-foreground mb-6">Software Engineer</p>
            <p className="text-base leading-relaxed mb-8">
              Experienced backend engineer, Founder of{" "}
              <a
                className="text-blue-600 hover:text-blue-700 transition-colors"
                title=".NET Cameroon Website"
                target="_blank"
                href="https://dotnet.cm"
              >
                .NET Cameroon
              </a>
              . Advocate for open source and developer growth through community.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/djoufson"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/djoufson"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:djouflegran@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
