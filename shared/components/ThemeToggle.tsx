"use client";

import { useTheme } from "../hooks/useTheme";
import { Button } from "@/components/ui/button";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <Button variant="outline" size="icon" className="h-9 w-9" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <LuSun size={16} /> : <LuMoon size={16} />}
    </Button>
  );
}
