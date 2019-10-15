import { ComponentType } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";

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
      selected: isSelected("/user/dashboards"),
      path: "/dashboards"
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
      icon: ListIcon,
      title: "داشبوردهای من",
      selected: isSelected("/user/manage/dashboards"),
      path: "/manage/dashboards"
    }
  ]
];

export default SideBarLinks;
