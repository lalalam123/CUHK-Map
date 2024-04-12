"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-xs">
      <p>{t("copyright")}</p>
      <p>{t("testing")}</p>
      <a href="https://github.com/lalalam123/CUHK-Map" target="_blank" rel="noopener noreferrer">
        {t("Github")}
      </a>
    </footer>
  );
}
