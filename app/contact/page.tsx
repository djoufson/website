import { Metadata } from "next";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Djoufson Che Bene. Reach out for collaboration, speaking engagements, or just to say hello.",
  openGraph: {
    title: "Contact - Djoufson Che Bene",
    description: "Get in touch with Djoufson Che Bene for collaboration, speaking engagements, or just to say hello.",
    url: "https://djoufson.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact - Djoufson Che Bene",
    description: "Get in touch with Djoufson Che Bene for collaboration, speaking engagements, or just to say hello.",
  },
};

export default function ContactPage() {
  const socialLinks = [
    {
      name: "Email",
      href: "mailto:djouflegran@gmail.com",
      icon: Mail,
      value: "djouflegran@gmail.com",
    },
    {
      name: "GitHub",
      href: "https://github.com/djoufson",
      icon: Github,
      value: "github.com/djoufson",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/djoufson",
      icon: Linkedin,
      value: "linkedin.com/in/djoufson",
    },
    {
      name: "Twitter/X",
      href: "https://x.com/djouf_legran",
      icon: Twitter,
      value: "@djouf_legran",
    },
  ];

  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground leading-relaxed">
          Have a question, want to collaborate, or just want to say hello?
          Feel free to reach out through the form below or connect with me
          on social media.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-medium">Other ways to connect</h2>
          <div className="space-y-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span>{link.value}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
