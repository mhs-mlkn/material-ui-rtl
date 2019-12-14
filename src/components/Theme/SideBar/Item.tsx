import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import clx from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { TSideBarLink, basePath } from "configs";
import { useThemeStore } from "components/Theme";

const useStyles = makeStyles(theme => ({
  listItem: {
    backgroundColor: "rgba(0, 0, 0, 0.2) !important"
  },
  listItemText: {
    textAlign: theme.direction === "rtl" ? "right" : "left"
  },
  nested: {
    paddingRight: theme.spacing(4)
  }
}));

const Item = (props: { item: TSideBarLink; nested?: boolean }) => {
  const { item, nested = false } = props;
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const [state, actions] = useThemeStore();

  const handleClick = () => {
    if (item.subItems) {
      return setOpen(!open);
    }
    if (state.drawerType === "temporary") {
      actions.toggleDrawer();
    }
    const path = typeof item.path === "function" ? item.path() : item.path;
    history.push(`${basePath}${path}`, { title: item.title });
  };

  return (
    <>
      <ListItem
        button
        classes={{ selected: classes.listItem }}
        className={clx({ [classes.nested]: nested })}
        selected={item.selected(location.pathname)}
        onClick={handleClick}
      >
        <ListItemIcon>{<item.icon />}</ListItemIcon>
        <ListItemText primary={item.title} className={classes.listItemText} />
        {item.subItems && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {/* {item.subItems && item.subItems.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Items items={item.subItems} nested />
        </Collapse>
      )} */}
    </>
  );
};

export default Item;
