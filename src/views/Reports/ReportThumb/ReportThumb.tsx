import React, { useState } from "react";
import moment from "moment-jalaali";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import KeyIcon from "@material-ui/icons/VpnKey";
import TodayIcon from "@material-ui/icons/Today";
import Chip from "components/Chip";
import { TReport } from "components/Report";
import { AccessButton, SelectButton, ReportAvatar } from "..";
import Skeleton from "./ReportThumb.skeleton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardAvatar: {
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        2
      ),
      [theme.direction === "ltr" ? "marginLeft" : "marginRight"]: "unset"
    },
    cardHeader: {
      alignItems: "unset",
      paddingBottom: 0,
      [theme.breakpoints.down("xs")]: {
        alignItems: "center"
      }
    },
    cardContent: {
      height: 51,
      overflowY: "auto",
      [theme.breakpoints.down("xs")]: {
        height: "unset",
        overflowY: "visible"
      }
    },
    cardActions: {
      [theme.direction === "rtl"
        ? "marginRight"
        : "marginLeft"]: theme.spacing()
    },
    description: {
      marginTop: theme.spacing()
    }
  })
);

const ReportThumb = (props: { report: TReport; loading?: boolean }) => {
  const classes = useStyles();
  const [elevation, setElevation] = useState(1);
  const { report, loading = false } = props;

  const handleMouseOver = () => {
    setElevation(12);
  };

  const handleMouseOut = () => {
    setElevation(1);
  };

  const getPersianDate = (date: string) =>
    moment(date.slice(0, -5)).format("LL");

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Card
      elevation={elevation}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader
        classes={{
          root: classes.cardHeader,
          content: classes.cardContent,
          avatar: classes.cardAvatar
        }}
        avatar={<ReportAvatar type={report.type} />}
        title={
          <Typography variant="body2" color="textPrimary" component="p">
            {report.name}
          </Typography>
        }
      />
      <CardContent>
        <Chip
          icon={<KeyIcon fontSize="small" />}
          size="small"
          label={report.id}
          color="primary"
          title="شناسه"
        />
        <Chip
          icon={<TodayIcon fontSize="small" />}
          size="small"
          label={getPersianDate(report.created)}
          color="primary"
          title="تاریخ ایجاد"
        />
        <Typography
          variant="caption"
          component="p"
          color="textSecondary"
          noWrap
          className={classes.description}
          title={report.description}
        >
          {report.description || <>&nbsp;</>}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <SelectButton report={report} />
        <AccessButton report={report} />
      </CardActions>
    </Card>
  );
};

export default ReportThumb;
