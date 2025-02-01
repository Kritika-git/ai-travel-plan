import React, { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa"
import { Button } from "../ui/button";

export default function ThemeToggle() {
  // Get the current theme from localStorage or default to light
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Apply the theme class to the root <html> element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save the theme to localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      onClick={toggleTheme}
    >
      {theme === "light" ? <FaRegMoon />
 : <FiSun />}
    </Button>
  );
}
