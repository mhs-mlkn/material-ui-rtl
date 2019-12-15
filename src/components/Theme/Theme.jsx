import React, { useEffect } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {JssProvider} from "react-jss";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGenerateClassName, makeStyles, jssPreset } from "@material-ui/styles";
import { useThemeStore, fontFamily, primary, secondary, error } from "components/Theme";
import Snackbar from "components/CustomSnackbar";
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
      primary,
      secondary,
      error,
      text: {
        primary: state.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.87)",
        secondary: "#999"
      }
    },
    typography: {
      useNextVariants: true,
      fontSize: 8,
      htmlFontSize: 8,
      fontFamily
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1921
      }
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: state.type === "dark" ? "#424951" : "#fff"
        }
      },
      MuiTableCell : {
        root: {
          textAlign: "start"
        }
      },
      // MuiOutlinedInput: {
      //   textAlign: "right"
      // }
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
      padding: theme.spacing(1),
      height: "100vh",
      overflow: "auto"
    }
  });

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Snackbar>
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
        </Snackbar>
      </JssProvider>
    </MuiThemeProvider>
  );
};

export default Theme;
