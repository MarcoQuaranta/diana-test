import { useState } from "react";

export interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
}

export function useStars(count: number): Star[] {
  const [stars] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 98}%`,
      top: `${Math.random() * 98}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }))
  );

  return stars;
}
