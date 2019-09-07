import { ComponentType } from "react";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";

export type SideBarLink = {
  icon: ComponentType;
  title: String;
}

export type SideBarLinks = SideBarLink[][]

const SideBarLinks: SideBarLinks = [
  [
    {
      icon: HomeIcon,
      title: "خانه"
    }
  ],
  [
    {
      icon: DashboardIcon,
      title: "داشبوردهای من"
    }
  ]
];

export default SideBarLinks;