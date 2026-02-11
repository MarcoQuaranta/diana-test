import { Star } from "@/app/lib/hooks/useStars";

interface StarsBackgroundProps {
  stars: Star[];
  keyPrefix?: string;
}

export default function StarsBackground({ stars, keyPrefix = "" }: StarsBackgroundProps) {
  return (
    <>
      {stars.slice(0, 25).map((star) => (
        <div
          key={`${keyPrefix}${star.id}`}
          className="star absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            contain: 'strict',
          }}
        />
      ))}
    </>
  );
}
