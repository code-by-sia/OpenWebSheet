import { useState } from "react";
import MenuBar from "../../menu-bar";
import DataMenu from "./data-menu";
import HomeMenu from "./home-menu";
import FormulaMenu from "./formula-menu";
import ViewMenu from "./view-menu";
import AboutMenu from "./about-menu";

export const MENU = [
  { id: "home", label: "Home", panel: HomeMenu },
  { id: "formulas", label: "Formulas", panel: FormulaMenu },
  { id: "data", label: "Data", panel: DataMenu },
  { id: "view", label: "View", panel: ViewMenu },
  { id: "about", label: "About", panel: AboutMenu },
];

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState(MENU[0].id);
  return <MenuBar items={MENU} value={activeMenu} onChange={setActiveMenu} />;
}
