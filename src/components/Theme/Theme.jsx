import React, { useEffect } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGenerateClassName, makeStyles, jssPreset } from "@material-ui/styles";
import { lightBlue, lightGreen, red } from "@material-ui/core/colors";
import { useThemeStore } from "components/Theme";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import Settings from "./Settings";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: "mhs"
});

const Theme = ({ children }) => {
  const [state] = useThemeStore();

  const theme = createMuiTheme({
    direction: state.direction,
    palette: {
      type: state.type,
      background: {
        paper: state.type === "dark" ? "#343a40" : "#fff", //424951
        default: state.type === "dark" ? "#3a4047" : "#f5f5f5"
      },
      primary: lightBlue.main,
      secondary: lightGreen.main,
      error: red.main,
      text: {
        primary: state.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.87)",
        secondary: "#999"
      }
    },
    typography: {
      useNextVariants: true,
      fontSize: 8,
      htmlFontSize: 8,
      fontFamily: "Yekan, sans-serif"
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: state.type === "dark" ? "#424951" : "#fff"
        }
      }
    }
  });

  useEffect(() => {
    document.getElementsByTagName("body")[0].setAttribute("dir", state.direction);
  }, [state.direction]);

  const useStyles = makeStyles({
    root: {
      display: "flex"
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
      height: "100vh",
      overflow: "auto"
    }
  });

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div className={classes.root}>
          <CssBaseline />
          {!state.isFullContent && state.showAppBar && <AppBar />}
          {!state.isFullContent && state.showSideBar && <SideBar />}
          <main className={classes.content}>
            {!state.isFullContent && state.showAppBar && <div id="appSpacer" className={classes.appBarSpacer} />}
            {children}
          </main>
          {!state.isFullContent && <Settings />}
        </div>
      </JssProvider>
    </MuiThemeProvider>
  );
};

export default Theme;
