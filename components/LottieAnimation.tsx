"use client"

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottieAnimationProps {
  animationPath: string;
}

export default function LottieAnimation({ animationPath }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, [animationPath]);

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