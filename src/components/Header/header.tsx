import React from "react";
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [t("profile"), t("settings"), t("help&feedback"), t("logout")];

  return (
    <Navbar maxWidth="full" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="" justify="end">
        <p className="font-bold text-inherit">{t("title")}</p>
        <ThemeSwitcher />
      </NavbarContent>

      {/* <NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="warning" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent> */}

      <NavbarMenu style={{ zIndex: 100 }}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full font-medium my-3"
              color={index === menuItems.length - 1 ? "danger" : "foreground"}
              href=""
              size="lg"
            >
              {item}
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
