import React, { useState, ReactNode } from "react";
import get from "lodash/get";
import clx from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import DragIcon from "@material-ui/icons/DragIndicator";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditAttributesIcon from "@material-ui/icons/EditAttributesOutlined";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import CodeIcon from "@material-ui/icons/Code";
import { useDashboards } from "components/Dashboard";
import {
  ReportService,
  TReportMenuAction,
  TReportInstance
} from "components/Report";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      direction: theme.direction,
      height: "100%"
    },
    cardContent: {
      overflow: "auto",
      padding: theme.spacing(),
      transition: "0.1s",
      height: "100%",
      "&:last-child": {
        padding: theme.spacing()
      }
    },
    cardAvatar: {
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        2
      ),
      [theme.direction === "ltr" ? "marginLeft" : "marginRight"]: "unset"
    },
    menu: {
      position: "absolute",
      top: theme.spacing(),
      [theme.direction === "rtl" ? "left" : "right"]: theme.spacing(0.5),
      zIndex: 10000
    },
    closeButton: {
      position: "absolute",
      [theme.direction === "rtl" ? "left" : "right"]: 0
    }
  })
);

type propsType = {
  instance: TReportInstance;
  autoRefresh?: boolean;
  isRunning?: boolean;
  isDrillDown?: boolean;
  onMenuItemClick?: (action: TReportMenuAction) => any;
  actions?: ReactNode;
  children: ReactNode;
};

const ReportCard = (props: propsType) => {
  const {
    instance,
    autoRefresh = false,
    isRunning = false,
    isDrillDown = false,
    onMenuItemClick = () => null,
    actions,
    children
  } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showActions, setShowActions] = useState(false);
  const [dashboards] = useDashboards();

  const hasFilters = () => {
    return ReportService.isComposite(instance)
      ? false
      : instance.report.query.queryFilters.length > 0;
  };

  const hasParams = () => {
    return ReportService.isComposite(instance)
      ? false
      : instance.report.query.queryParams.some(
          p => ["BY_PARENT", "BY_BUSINESS_OR_PARENT"].indexOf(p.fill) > -1
        );
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleActions = () => {
    setShowActions(!showActions);
    handleClose();
  };

  const handleMenuItemClick = (action: TReportMenuAction) => () => {
    onMenuItemClick(action);
    handleClose();
  };

  return (
    <Card className={clx(classes.card)} elevation={0}>
      <CardContent
        classes={{ root: classes.cardContent }}
        style={{ height: showActions ? "calc(100% - 45px)" : "100%" }}
      >
        <DragIcon className="draggableHandle" />
        {!!actions && (
          <>
            <IconButton
              color="default"
              size="small"
              onClick={handleOpen}
              className={classes.menu}
            >
              <MoreVertIcon color="primary" fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!get(dashboards.selected, "shared", true) && (
                <Tooltip
                  title={showActions ? "عدم نمایش ابزار" : "نمایش ابزار"}
                  placement="top"
                >
                  <MenuItem onClick={toggleActions}>
                    <SettingsIcon fontSize="small" />
                  </MenuItem>
                </Tooltip>
              )}
              {autoRefresh && (
                <Tooltip
                  placement="top"
                  title={isRunning ? "توقف اجرای خودکار" : "شروع اجرای خودکار"}
                >
                  <MenuItem
                    onClick={handleMenuItemClick("TOGGLE_AUTO_REFRESH")}
                  >
                    {isRunning ? (
                      <PauseIcon fontSize="small" />
                    ) : (
                      <PlayArrowIcon fontSize="small" />
                    )}
                  </MenuItem>
                </Tooltip>
              )}
              <Tooltip placement="top" title="بارگذاری مجدد بدون cache">
                <MenuItem onClick={handleMenuItemClick("REFRESH_REPORT")}>
                  <RefreshIcon fontSize="small" />
                </MenuItem>
              </Tooltip>
              {hasFilters() && (
                <Tooltip placement="top" title="فیلتر گزارش">
                  <MenuItem onClick={handleMenuItemClick("OPEN_FILTERS")}>
                    <FilterListIcon fontSize="small" />
                  </MenuItem>
                </Tooltip>
              )}
              {hasParams() && (
                <Tooltip placement="top" title="تغییر پارامتر">
                  <MenuItem onClick={handleMenuItemClick("OPEN_PARAMS")}>
                    <EditAttributesIcon fontSize="small" />
                  </MenuItem>
                </Tooltip>
              )}
              <Tooltip placement="top" title="ذخیره">
                <MenuItem onClick={handleMenuItemClick("OPEN_EXPORT")}>
                  <SaveAltIcon fontSize="small" />
                </MenuItem>
              </Tooltip>
              <Tooltip placement="top" title="مشاهده تمام صفحه">
                <MenuItem onClick={handleMenuItemClick("FULLSCREEN")}>
                  <FullscreenIcon fontSize="small" />
                </MenuItem>
              </Tooltip>
              <Tooltip placement="top" title="مشاهده گزارش در صفحه شما">
                <MenuItem onClick={handleMenuItemClick("OPEN_EMBED")}>
                  <CodeIcon fontSize="small" />
                </MenuItem>
              </Tooltip>
              {isDrillDown && (
                <Tooltip placement="top" title="بازگشت به گزارش اصلی">
                  <MenuItem
                    onClick={handleMenuItemClick("BACK_FROM_DRILLDOWN")}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </MenuItem>
                </Tooltip>
              )}
            </Menu>
          </>
        )}
        {children}
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: showActions ? "block" : "none" }}
      >
        <IconButton
          color="default"
          size="small"
          onClick={toggleActions}
          className={classes.closeButton}
        >
          <CloseIcon color="action" fontSize="small" />
        </IconButton>
        {!!actions && actions}
      </CardActions>
    </Card>
  );
};

export default ReportCard;
