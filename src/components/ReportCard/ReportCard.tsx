import React from "react";
import clx from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DragIcon from "@material-ui/icons/DragIndicator";
import { useLayout, TLayout, TActions } from "components/Layout";
// import CardActions from "@material-ui/core/CardActions";
// import Avatar from "@material-ui/core/Avatar";
// import KeyIcon from "@material-ui/icons/VpnKey";
// import TodayIcon from "@material-ui/icons/Today";
// import AddIcon from "@material-ui/icons/Add";
// import ShareIcon from "@material-ui/icons/Share";
// import bar from "assets/img/bar.svg";
// import Chip from "components/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      direction: theme.direction,
      height: "100%"
    },
    cardHeader: {
      alignItems: "unset",
      padding: theme.spacing(1),
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
    cardAvatar: {
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        2
      ),
      [theme.direction === "ltr" ? "marginLeft" : "marginRight"]: "unset"
    },
    description: {
      marginTop: theme.spacing()
    },
    avatar: {
      backgroundColor:
        theme.palette.type === "dark"
          ? "#f5f5f5"
          : theme.palette.background.default,
      borderRadius: 0,
      padding: theme.spacing(0.5),
      width: 60,
      height: 60
    }
  })
);

const ReportCard = () => {
  const classes = useStyles();
  const [state] = useLayout<TLayout, TActions>();

  return (
    <Card className={clx(classes.card)} elevation={0}>
      <CardHeader
        classes={{
          root: classes.cardHeader,
          content: classes.cardContent
        }}
        title={
          <>
            {state.editable && (
              <DragIcon
                className="draggableHandle"
                style={{ cursor: "move", zIndex: 200000 }}
              />
            )}
            <Typography variant="body2" color="textPrimary" component="span">
              نام گزارش خیلی طولانی برای نمونه آوردم
            </Typography>
          </>
        }
      />
      <CardContent></CardContent>
    </Card>
  );
};

export default ReportCard;
