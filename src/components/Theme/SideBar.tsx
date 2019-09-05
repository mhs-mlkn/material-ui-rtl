import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AdjustIcon from "@material-ui/icons/Adjust";
import PanoramaFishEyeIcon from "@material-ui/icons/PanoramaFishEye";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useThemeStore } from "components/Theme";
import { drawerWidth } from "./theme.constants";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding:
      theme.direction === "rtl"
        ? theme.spacing(0, 2, 0, 1)
        : theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar
  },
  listItemText: {
    textAlign: theme.direction === "rtl" ? "right" : "left"
  },
  border: {
    [theme.direction === "rtl"
      ? "borderLeftColor"
      : "borderRightColor"]: "#00000026"
  },
  divider: {
    backgroundColor: "#00000026"
  },
  paper: {
    overflow: "hidden"
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, actions] = useThemeStore();

  function handleDrawerOpen() {
    actions.toggleDrawer();
  }

  function handleDrawerClose() {
    actions.toggleDrawer();
  }

  return (
    <Drawer
      variant={state.drawerType}
      onClose={state.drawerType === "temporary" ? handleDrawerClose : undefined}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: state.isDrawerOpen,
        [classes.drawerClose]: !state.isDrawerOpen
      })}
      classes={{
        paperAnchorDockedRight: clsx(classes.border),
        paperAnchorDockedLeft: clsx(classes.border),
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: state.isDrawerOpen,
          [classes.drawerClose]: !state.isDrawerOpen
        })
      }}
      open={state.isDrawerOpen}
    >
      <div className={classes.toolbar}>
        <div style={{ flexGrow: 1, justifyContent: "end" }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => actions.toggleDrawerType()}
          >
            {state.drawerType === "permanent" ? (
              <AdjustIcon fontSize="small" />
            ) : (
              <PanoramaFishEyeIcon fontSize="small" />
            )}
          </IconButton>
        </div>
        <IconButton
          onClick={state.isDrawerOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} className={classes.listItemText} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.divider} />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} className={classes.listItemText} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
