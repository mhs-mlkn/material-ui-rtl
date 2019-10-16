import React from "react";
import clx from "classnames";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import MuiToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SyncIcon from "@material-ui/icons/Sync";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SortIcon from "@material-ui/icons/Sort";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Button } from "components/Button";

const ToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
      [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: -1,
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        0.5
      )
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(MuiToggleButtonGroup);

export type TView = "grid" | "list";
export type TOrderBy = "id" | "created" | "name";
export type TOrderDir = "asc" | "desc";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      [theme.breakpoints.down("xs")]: {
        display: "block",
        textAlign: "center"
      }
    },
    paper: {
      display: "inline-flex",
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: "nowrap"
    },
    button: {
      margin: theme.spacing(0.5)
    },
    refreshButton: {
      minWidth: 38,
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: 0
    },
    listItemText: {
      textAlign: "start"
    },
    divider: {
      alignSelf: "stretch",
      height: "auto",
      margin: theme.spacing(1, 0.5)
    }
  })
);

type TProps = {
  initials: { view: TView; orderBy: TOrderBy; orderDir: TOrderDir };
  onRefresh: () => any;
  onChanageView: (v: TView) => any;
  onChanageOrder: (ob: TOrderBy, od: TOrderDir) => any;
};

const ViewOrderToolBox = (props: TProps) => {
  const [view, setView] = React.useState<TView>(props.initials.view);
  const [orderBy, setOrderBy] = React.useState<TOrderBy>(
    props.initials.orderBy
  );
  const [orderDir, setOrderDir] = React.useState<TOrderDir>(
    props.initials.orderDir
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefreshClicked = () => {
    props.onRefresh();
  };

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: TView
  ) => {
    setView(newView ? newView : view);
    props.onChanageView(newView);
  };

  const handleChangeOrderBy = (newOrderBy: TOrderBy) => () => {
    const _orderBy = newOrderBy ? newOrderBy : orderBy;
    setOrderBy(_orderBy);
    handleClose();
    props.onChanageOrder(_orderBy, orderDir);
  };

  const handleChangeOrderDir = (
    event: React.MouseEvent<HTMLElement>,
    newOrderDir: TOrderDir
  ) => {
    const _orderDir = newOrderDir ? newOrderDir : orderDir;
    setOrderDir(_orderDir);
    props.onChanageOrder(orderBy, _orderDir);
  };

  const classes = useStyles();

  return (
    <span className={classes.wrapper}>
      <Paper elevation={0} className={classes.paper}>
        <Button
          variant="text"
          text=""
          color="default"
          title="بروزرسانی مجدد"
          size="small"
          className={clx(classes.button, classes.refreshButton)}
          onClick={handleRefreshClicked}
        >
          <SyncIcon fontSize="small" />
        </Button>
        <Divider orientation="vertical" className={classes.divider} />
        <ToggleButtonGroup
          size="small"
          value={view}
          exclusive
          onChange={handleChangeView}
        >
          <ToggleButton value="list">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="grid">
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider orientation="vertical" className={classes.divider} />
        <Button
          variant="text"
          text=""
          icon={SortIcon}
          color="default"
          title="مرتب سازی بر اساس"
          size="small"
          className={classes.button}
          onClick={handleClick}
        >
          {orderBy === "id" ? (
            <VpnKeyIcon fontSize="small" />
          ) : orderBy === "created" ? (
            <ScheduleIcon fontSize="small" />
          ) : (
            <SortByAlphaIcon fontSize="small" />
          )}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleChangeOrderBy("id")}>
            <ListItemIcon>
              <VpnKeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="شناسه" />
          </MenuItem>
          <MenuItem onClick={handleChangeOrderBy("created")}>
            <ListItemIcon>
              <ScheduleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary="تاریخ ایجاد"
            />
          </MenuItem>
          <MenuItem onClick={handleChangeOrderBy("name")}>
            <ListItemIcon>
              <SortByAlphaIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="نام" />
          </MenuItem>
        </Menu>
        <ToggleButtonGroup
          size="small"
          value={orderDir}
          exclusive
          onChange={handleChangeOrderDir}
        >
          <ToggleButton value="asc" title="مرتب سازی صعودی">
            <ArrowUpwardIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="desc" title="مرتب سازی نزولی">
            <ArrowDownwardIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </span>
  );
};

export default ViewOrderToolBox;
