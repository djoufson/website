export default function StructuredData({ locale = "en" }: { locale?: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://djoufson.com/#person",
        "name": "Djoufson Che Bene",
        "alternateName": "Djoufson",
        "url": "https://djoufson.com",
        "image": {
          "@type": "ImageObject",
          "url": "https://djoufson.com/assets/djouf.png",
          "width": 400,
          "height": 400
        },
        "sameAs": [
          "https://github.com/djoufson",
          "https://linkedin.com/in/djoufson",
          "https://x.com/djouf_legran"
        ],
        "jobTitle": ["Software Engineer", "Community Builder", "Digital Artist"],
        "worksFor": {
          "@type": "Organization",
          "name": "Africa Global Logistics",
          "url": "https://www.aglgroup.com"
        },
        "knowsAbout": [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          ".NET",
          "C#",
          "Web Development",
          "Full Stack Development",
          "Software Engineering",
          "Digital Art",
          "Illustration",
          "Character Design"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "University"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://djoufson.com/#website",
        "url": "https://djoufson.com",
        "name": "Djoufson Che Bene - Full Stack Developer",
        "description": "Full Stack Developer and Software Engineer passionate about building modern web applications",
        "publisher": {
          "@id": "https://djoufson.com/#person"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://djoufson.com/blog?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://djoufson.com/#webpage",
        "url": "https://djoufson.com",
        "name": "Home - Djoufson Che Bene",
        "isPartOf": {
          "@id": "https://djoufson.com/#website"
        },
        "about": {
          "@id": "https://djoufson.com/#person"
        },
        "description": "Welcome to Djoufson Che Bene's portfolio. Full Stack Developer specializing in React, Next.js, .NET, and modern web technologies.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://djoufson.com"
            }
          ]
        }
      },
      {
        "@type": "Blog",
        "@id": "https://djoufson.com/blog#blog",
        "url": "https://djoufson.com/blog",
        "name": "Technical Blog - Djoufson Che Bene",
        "description": "Technical blog posts about software development, web technologies, and programming best practices",
        "publisher": {
          "@id": "https://djoufson.com/#person"
        },
        "inLanguage": locale === "fr" ? "fr-FR" : "en-US"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
