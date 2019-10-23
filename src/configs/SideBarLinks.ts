import { ComponentType } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import DashboardIcon from "@material-ui/icons/Dashboard";

import { getLS } from "utility";

export type TSideBarLink = {
  icon: ComponentType;
  title: string;
  path?: string | (() => string);
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
      selected: (path: string) => path.startsWith("/user/dashboard/"),
      path: () => `/dashboard/${getLS("DU_DASHBOARD_ID")}`
    }
  ],
  [
    {
      icon: ListIcon,
      title: "گزارش ها",
      selected: isSelected("/user/reports"),
      path: "/reports"
    }
  ],
  [
    {
      icon: DashboardIcon,
      title: "داشبوردهای من",
      selected: isSelected("/user/manage/dashboards"),
      path: "/manage/dashboards"
    }
  ]
];

export default SideBarLinks;
