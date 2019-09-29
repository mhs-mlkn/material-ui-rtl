import { ComponentType } from "react";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";

export type TSideBarLink = {
  icon: ComponentType;
  title: String;
  path?: string;
  selected: (p: string) => boolean;
  subItems?: TSideBarLink[];
};

export type TSideBarLinks = TSideBarLink[][];

function isSelected(match: string) {
  return (path: string) => path === match;
}

// function parent(path: string) {
//   return false;
// }

const SideBarLinks: TSideBarLinks = [
  [
    {
      icon: HomeIcon,
      title: "خانه",
      selected: isSelected("/user/home"),
      path: "/home"
    }
  ],
  [
    {
      icon: DashboardIcon,
      title: "داشبوردهای من",
      selected: isSelected("/user/about"),
      path: "/about"
    }
  ]
];

export default SideBarLinks;
