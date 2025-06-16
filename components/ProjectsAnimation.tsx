"use client"

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function ProjectsAnimation() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Load the animation data
    fetch("/animations/coding-animation-hands.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-full mx-auto">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-full h-full"
      />
    </div>
  );
} 