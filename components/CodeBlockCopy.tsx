"use client";

import { useEffect } from "react";

export function CodeBlockCopy() {
  useEffect(() => {
    const allCodeBlocks = document.querySelectorAll<HTMLElement>("pre");

    allCodeBlocks.forEach((codeBlock) => {
      if (codeBlock.querySelector(".copy-button")) {
        return;
      }

      codeBlock.style.position = "relative";

      const button = document.createElement("button");
      button.title = "Copy the code";
      button.className =
        "copy-button absolute top-2.5 right-2.5 p-1.5 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer";
      button.setAttribute("aria-label", "Copy code to clipboard");

      const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`;
      const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>`;

      button.innerHTML = copyIcon;

      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      button.addEventListener("click", async () => {
        const codeElement = codeBlock.querySelector("code");
        if (!codeElement) return;

        try {
          await navigator.clipboard.writeText(codeElement.innerText);

          button.innerHTML = checkIcon;
          button.classList.add("text-green-400");

          if (timeoutId) clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            button.innerHTML = copyIcon;
            button.classList.remove("text-green-400");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
      });

      codeBlock.appendChild(button);
    });
  }, []);

  return null;
} 