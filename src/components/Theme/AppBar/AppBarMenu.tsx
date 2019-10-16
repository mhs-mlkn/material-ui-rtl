import React from "react";
import { useHistory } from "react-router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PowerSettingsIcon from "@material-ui/icons/PowerSettingsNew";
import SettingsIcon from "@material-ui/icons/Settings";
import { AuthService } from "components/Auth";
import { useThemeStore, TTheme, TActions } from "components/Theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText: {
      textAlign: "start"
    }
  })
);

const AppBarMenu = () => {
  const classes = useStyles();
  let history = useHistory();
  const actions = useThemeStore<TTheme, TActions>()[1];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    AuthService.logout();
    history.push("/");
  };

  const handleSettingsClick = () => {
    handleClose();
    actions.toggleSettings();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="تنظیمات" />
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <PowerSettingsIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="خروج" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppBarMenu;
