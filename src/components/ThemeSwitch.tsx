import React from "react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import { useTranslations } from "next-intl";

export default function ThemeSwitcher() {
  const t = useTranslations("Navbar");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      color="default"
      endContent={theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      style={{
        backgroundColor: theme !== "dark" ? "#ffffff" : "#000000",
        color: theme !== "dark" ? "#000000" : "#ffffff",
        width: "20px",
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    ></Button>
  );
}
