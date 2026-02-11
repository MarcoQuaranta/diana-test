import { useState, useEffect } from "react";

export function useFirstAccess(): [boolean, (value: boolean) => void] {
  const [hasFirstAccess, setHasFirstAccess] = useState(false);

  useEffect(() => {
    const firstAccess = localStorage.getItem('ricciolinoPrimeAccess');
    if (firstAccess === 'true') {
      setHasFirstAccess(true);
    }
  }, []);

  const setFirstAccess = (value: boolean) => {
    if (value) {
      localStorage.setItem('ricciolinoPrimeAccess', 'true');
    } else {
      localStorage.removeItem('ricciolinoPrimeAccess');
    }
    setHasFirstAccess(value);
  };

  return [hasFirstAccess, setFirstAccess];
}
