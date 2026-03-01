"use client"

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Share:</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title="Share on X/Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopy}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
