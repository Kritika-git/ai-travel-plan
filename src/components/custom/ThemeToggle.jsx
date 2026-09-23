import React, { useEffect, useState } from "react";
import { FiMonitor, FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  useEffect(() => {
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") {
        document.documentElement.dataset.theme = mediaQuery.matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "system" ? "light" : prev === "light" ? "dark" : "system"));
  };

  const nextTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={toggleTheme}
    >
      {theme === "system" ? <FiMonitor /> : theme === "dark" ? <FiSun /> : <FaRegMoon />}
    </Button>
  );
}
