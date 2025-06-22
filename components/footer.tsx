import React from 'react'

export default function Footer() {
  return (
    <footer className="container flex justify-between p-2">
      <div className="flex gap-4">
        <a
          className="link"
          title="Djoufson Che Bene's Github"
          target="_blank"
          href="https://github.com/djoufson"
        >
          Github
        </a>
        <a
          className="link"
          title="Djoufson Che Bene's LinkedIn"
          target="_blank"
          href="https://linkedin.com/in/djoufson"
        >
          LinkedIn
        </a>
        <a
          className="link"
          title="Djoufson Che Bene's Twitter/X"
          target="_blank"
          href="https://x.com/djouf_legran"
        >
          Twitter/X
        </a>
      </div>
      <div>
        &copy; Djoufson {new Date().getFullYear()}
      </div>
    </footer>
  );
}
