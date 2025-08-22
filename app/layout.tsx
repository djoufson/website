import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import GoogleAnalytics from "@/components/google/GoogleAnalytics";
import GoogleAdSense from "@/components/google/GoogleAdSense";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/theme-provider";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL('https://djoufson.com'),
  title: {
    default: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
    template: "%s"
  },
  description: "Full Stack Developer and Software Engineer passionate about building modern web applications with React, Next.js, .NET, and cloud technologies. Explore my projects, read my technical blog, and connect with me.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer", 
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    ".NET",
    "C#",
    "Node.js",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Cloud Computing",
    "Technical Blog",
    "Portfolio",
    "Djoufson",
    "Che Bene"
  ],
  authors: [{ name: "Djoufson Che Bene" }],
  creator: "Djoufson Che Bene",
  publisher: "Djoufson Che Bene",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://djoufson.com',
    siteName: 'Djoufson Che Bene - Full Stack Developer',
    title: 'Djoufson Che Bene - Full Stack Developer & Software Engineer',
    description: 'Full Stack Developer and Software Engineer passionate about building modern web applications. Explore my projects, read my technical blog, and connect with me.',
    images: [
      {
        url: '/assets/djouf.png',
        width: 1200,
        height: 630,
        alt: 'Djoufson Che Bene - Full Stack Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djoufson Che Bene - Full Stack Developer & Software Engineer',
    description: 'Full Stack Developer and Software Engineer passionate about building modern web applications. Explore my projects, read my technical blog, and connect with me.',
    site: '@djouf_legran',
    creator: '@djouf_legran',
    images: ['/assets/djouf.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <GoogleAdSense />
        <StructuredData />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
