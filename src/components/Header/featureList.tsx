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
import { FaTools } from "react-icons/fa";

export default function FeatureList() {
  const t = useTranslations("Features");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  type MenuItem = {
    label: string;
    bgColor: string;
    icon: JSX.Element;
  };

  const spectrum = [
    "#9e0142",
    "#d53e4f",
    "#f46d43",
    "#fdae61",
    "#ffda71",
    "#c9dc67",
    "#abdda4",
    "#66c2a5",
    "#3288bd",
    "#5e4fa2",
  ];

  const menuItems: MenuItem[] = [
    {
      label: t("searchExplore"),
      // bgColor: "#9e0142",
      bgColor: spectrum[0],
      icon: <LuRadar style={{ color: "#FFFFFF" }} />,
    },
    {
      label: t("searchPath"),
      // bgColor: "#80B3FF",
      bgColor: spectrum[1],
      icon: <FaPersonWalking style={{ color: "#FFFFFF" }} />,
    },
    {
      label: t("searchBus"),
      // bgColor: "#98E4FF",
      bgColor: spectrum[2],
      icon: <FaBusAlt style={{ color: "#FFFFFF" }} />,
    },
    {
      label: t("searchBuilding"),
      // bgColor: "#AED2FF",
      bgColor: spectrum[3],
      icon: <FaBuildingCircleArrowRight style={{ color: "#FFFFFF" }} />,
    },
    {
      label: t("searchCanteen"),
      // bgColor: "#D67BFF",
      bgColor: spectrum[4],
      icon: <MdRestaurant style={{ color: "#FFFFFF" }} />,
    },
    {
      label: t("searchFacility"),
      // bgColor: "#BC62FC",
      bgColor: spectrum[5],
      // icon: <TiPrinter style={{ color: "#FFFFFF" }} />,
      icon: <FaTools style={{ color: "#FFFFFF" }} />,
    },
    {
      label: t("searchToilet"),
      // bgColor: "#9400FF",
      bgColor: spectrum[6],
      icon: <FaRestroom style={{ color: "#FFFFFF" }} />,
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
              <Link className="font-medium" color="foreground" href="#">
                {item.label}
              </Link>
            </div>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
