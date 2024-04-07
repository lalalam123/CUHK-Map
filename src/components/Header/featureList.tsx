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
import { useTranslations } from "next-intl";
import { GiPathDistance } from "react-icons/gi";
import { FaPersonWalking } from "react-icons/fa6";
import { LuRadar } from "react-icons/lu";
import { FaBusAlt } from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { MdRestaurant } from "react-icons/md";
import { TiPrinter } from "react-icons/ti";
import { FaRestroom } from "react-icons/fa";

export default function FeatureList() {
  const t = useTranslations("Features");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  type MenuItem = {
    label: string;
    bgColor: string;
    icon: JSX.Element;
  };

  const menuItems: MenuItem[] = [
    {
      label: t("searchExplore"),
      bgColor: "#687EFF",
      icon: <LuRadar style={{ color: "#000000" }} />,
    },
    {
      label: t("searchPath"),
      bgColor: "#80B3FF",
      icon: <FaPersonWalking style={{ color: "#000000" }} />,
    },
    {
      label: t("searchBus"),
      bgColor: "#98E4FF",
      icon: <FaBusAlt style={{ color: "#000000" }} />,
    },
    {
      label: t("searchBuilding"),
      bgColor: "#AED2FF",
      icon: <FaBuildingCircleArrowRight style={{ color: "#000000" }} />,
    },
    {
      label: t("searchCanteen"),
      bgColor: "#D67BFF",
      icon: <MdRestaurant style={{ color: "#000000" }} />,
    },
    {
      label: t("searchFacility"),
      bgColor: "#BC62FC",
      icon: <TiPrinter style={{ color: "#000000" }} />,
    },
    {
      label: t("searchToilet"),
      bgColor: "#9400FF",
      icon: <FaRestroom style={{ color: "#000000" }} />,
    },
  ];

  return (
    <Navbar maxWidth="full" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="flex gap-4 overflow-x-auto" justify="start">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
              }}
            >
              <div style={{ borderRadius: "50%", backgroundColor: item.bgColor, padding: "10px" }}>
                {item.icon}
              </div>
              <Link color="foreground" href="#">
                {item.label}
              </Link>
            </div>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
