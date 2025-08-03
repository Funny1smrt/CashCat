import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    try {
      if (stored === null || stored === "undefined") return initialValue;
      return JSON.parse(stored);
    } catch (error) {
      // Якщо щось не так з JSON, повертаємо initialValue
      console.error(`Error parsing localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
