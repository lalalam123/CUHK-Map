"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import ThemeSwitcher from "@/components/ThemeSwitch";
import LangSwitcher from "@/components/LangSwitch";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: t("moreaboutcampus"), path: "https://www.cuhk.edu.hk/chinese/campus/campus.html" },
    { label: t("moreaboutschoolbus"), path: "https://transport.cuhk.edu.hk/" },
    {
      label: t("moreaboutfacility"),
      path: "https://www.cuhk.edu.hk/chinese/campus/accommodation.html",
    },
    {
      label: t("moreaboutmuseum"),
      path: "https://www.cuhk.edu.hk/chinese/campus/library-museum.html",
    },
    { label: t("help&feedback"), path: "https://forms.gle/ChJdT9bf42xyzcb46" },
  ];

  return (
    <Navbar maxWidth="full" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="" justify="end">
        <p className="font-bold text-inherit">{t("title")}</p>
        <ThemeSwitcher />
      </NavbarContent>
      <NavbarMenu style={{ zIndex: 100 }}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              isExternal
              showAnchorIcon
              className="w-full font-medium my-3"
              color={index === menuItems.length - 1 ? "primary" : "foreground"}
              href={item.path}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <LangSwitcher />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
