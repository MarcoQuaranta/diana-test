import { useState, useEffect } from "react";

export function useValentineCountdown() {
  const [valentineCountdown, setValentineCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const valentineDate = new Date("2026-02-14T00:00:00");

    const updateValentineCountdown = () => {
      const now = new Date();
      const diff = valentineDate.getTime() - now.getTime();

      if (diff <= 0) {
        setValentineCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setValentineCountdown({ days, hours, minutes, seconds });
    };

    updateValentineCountdown();
    const interval = setInterval(updateValentineCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return valentineCountdown;
}
