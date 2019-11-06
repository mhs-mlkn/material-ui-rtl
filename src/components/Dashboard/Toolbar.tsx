import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import MuiToolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import { DashboardTimer, SaveDashboard } from "components/Dashboard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.mixins.toolbar.minHeight
    },
    appBar: {
      top: "auto",
      bottom: 0
    },
    grow: {
      flexGrow: 1,
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        textAlign: "start"
      }
    }
  })
);

const Toolbar = () => {
  const classes = useStyles();

  return (
    <Hidden smUp>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.root}
      >
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <MuiToolbar variant="dense">
            <div className={classes.grow} style={{ textAlign: "start" }}>
              <SaveDashboard />
            </div>
            <DashboardTimer />
          </MuiToolbar>
        </AppBar>
      </Grid>
    </Hidden>
  );
};

export default Toolbar;
