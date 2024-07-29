import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setBebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};
