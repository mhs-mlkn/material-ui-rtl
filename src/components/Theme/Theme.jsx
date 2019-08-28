import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGenerateClassName, makeStyles, jssPreset } from "@material-ui/styles";
import { blue, lightGreen, red } from "@material-ui/core/colors";
import { useThemeStore } from "components/Theme";
import AppBar from "./AppBar";

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
        paper: state.type === "dark" ? "#424951" : "#fff", //343a40
        default: state.type === "dark" ? "#3a4047" : "#f5f5f5"
      },
      primary: blue,
      secondary: lightGreen,
      error: red,
      text: {
        primary: "#c1c1c1",
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
          <AppBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </div>
      </JssProvider>
    </MuiThemeProvider>
  );
};

export default Theme;