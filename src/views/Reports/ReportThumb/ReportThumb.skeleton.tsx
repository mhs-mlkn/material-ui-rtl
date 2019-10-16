import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Skeleton from "@material-ui/lab/Skeleton";

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
    skeleton: {
      margin: theme.spacing(0, 1)
    }
  })
);

const ReportThumb = () => {
  const classes = useStyles();
  const [elevation, setElevation] = useState(1);

  const handleMouseOver = () => {
    setElevation(12);
  };

  const handleMouseOut = () => {
    setElevation(1);
  };

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
        avatar={<Skeleton variant="circle" width={60} height={60} />}
        title={<Skeleton height={14} width="60%" />}
      />
      <CardContent>
        <Skeleton variant="rect" height={18} width="35%" />
        <Skeleton height={12} width="90%" />
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton
          variant="circle"
          width={30}
          height={30}
          className={classes.skeleton}
        />
        <Skeleton variant="circle" width={30} height={30} />
      </CardActions>
    </Card>
  );
};

export default ReportThumb;
