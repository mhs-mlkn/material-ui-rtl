import React, { useState } from "react";
import clx from "classnames";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DragIcon from "@material-ui/icons/DragIndicator";
import SettingsIcon from "@material-ui/icons/Settings";
import Chart from "components/Chart";
import ThemeMenu from "./ThemeMenu";
import { ReportService, TThemes, TReportInstance, TReportType } from ".";
import "assets/themes/dark";
import "assets/themes/infographic";
import "assets/themes/macarons";
import "assets/themes/roma";
import "assets/themes/shine";
import "assets/themes/vintage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      direction: theme.direction,
      height: "100%"
    },
    cardContent: {
      padding: theme.spacing(),
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
    settingsIcon: {
      position: "absolute",
      top: 8,
      border: "1px solid",
      [theme.direction === "rtl" ? "left" : "right"]: 2,
      cursor: "pointer",
      zIndex: 10000
    }
  })
);

type propsType = {
  instanceId: number;
};

const Report = ({ instanceId }: propsType) => {
  const _muiTheme = useTheme();
  const classes = useStyles();
  const [customizable, setCustomizable] = useState(false);
  const [instance] = useState<TReportInstance | undefined>(
    ReportService.get(instanceId)
  );
  const [theme, setTheme] = useState<TThemes>(
    _muiTheme.palette.type === "dark" ? "dark" : "default"
  );

  const handleSelectTheme = (t: TThemes) => {
    setTheme(t);
  };

  const toggleCustomizable = () => setCustomizable(!customizable);

  const getReport = (t: TReportType) => {
    return <Chart theme={theme} loading={false} />;
    // switch (t) {
    //   case "Scalar":
    //     return <h4>Scalar</h4>;
    //   case "Table":
    //   return <h4>Table</h4>;

    //   default:
    //     return <Chart theme={theme} />;
    // }
  };

  if (!instance) {
    return null;
  }

  return (
    <Card className={clx(classes.card)} elevation={0}>
      <CardContent
        classes={{ root: classes.cardContent }}
        style={{ height: customizable ? "calc(100% - 68px)" : "100%" }}
      >
        <SettingsIcon
          className={classes.settingsIcon}
          fontSize="small"
          onClick={toggleCustomizable}
        />
        <DragIcon className="draggableHandle" />
        {getReport(instance.report.type)}
      </CardContent>
      {customizable && (
        <CardActions disableSpacing>
          <ThemeMenu theme={theme} onChange={handleSelectTheme} />
        </CardActions>
      )}
    </Card>
  );
};

export default Report;
