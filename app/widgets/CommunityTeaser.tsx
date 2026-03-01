import Link from "next/link";
import { Users, Mic, ArrowRight } from "lucide-react";

export default function CommunityTeaser() {
  return (
    <section className="section py-16">
      <div className="container">
        <div className="bg-muted/30 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-3">Community</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            As the founder of .NET Cameroon, I&apos;m passionate about building
            developer communities, organizing meetups, and sharing knowledge
            through speaking engagements.
          </p>
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span>1000+ community members</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mic className="w-4 h-4 text-orange-500" />
              <span>5+ events organized</span>
            </div>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            Learn more about my community work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
