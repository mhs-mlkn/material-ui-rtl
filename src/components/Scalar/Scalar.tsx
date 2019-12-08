import React, { useEffect } from "react";
import clx from "classnames";
import get from "lodash/get";
import defaultsDeep from "lodash/defaultsDeep";
import {
  useTheme,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TReportIcons, TChartTheme } from "components/Report";
import { ScalarIcon, defaultOptions, getDisplay } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      justifyContent: "space-between"
    },
    title: {
      [theme.direction === "rtl" ? "marginRight" : "marginLeft"]: 36,
      marginBottom: theme.spacing(2)
    },
    value: {
      alignSelf: "center"
    },
    icon: {
      alignSelf: "center"
    },
    subtitle: {
      alignSelf: "center"
    }
  })
);

type propsType = {
  name: string;
  data: { title: any; value: any };
  icon: TReportIcons;
  theme: TChartTheme;
  options: object;
};

const Scalar = (props: propsType) => {
  const classes = useStyles();
  const muiTheme = useTheme<Theme>();
  const { name, data, icon, theme, options } = props;

  useEffect(() => {
    defaultsDeep(options, defaultOptions);
  }, [options]);

  const themes: {
    [key in TChartTheme]: {
      root: React.CSSProperties;
      title: React.CSSProperties;
      value: React.CSSProperties;
      icon: React.CSSProperties;
      subtitle: React.CSSProperties;
    };
  } = {
    default: {
      root: { backgroundColor: "transparent" },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.primary.main },
      subtitle: { color: muiTheme.palette.primary.main }
    },
    light: {
      root: { backgroundColor: "transparent" },
      title: { color: muiTheme.palette.secondary.main },
      value: { color: muiTheme.palette.secondary.main },
      icon: { color: muiTheme.palette.secondary.main },
      subtitle: { color: muiTheme.palette.secondary.main }
    },
    dark: {
      root: { backgroundColor: muiTheme.palette.background.paper },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.primary.main },
      subtitle: { color: muiTheme.palette.primary.main }
    },
    vintage: {
      root: { backgroundColor: "#fef8ef" },
      title: { color: muiTheme.palette.secondary.main },
      value: { color: muiTheme.palette.secondary.main },
      icon: { color: muiTheme.palette.primary.main },
      subtitle: { color: muiTheme.palette.secondary.main }
    },
    macarons: {
      root: { backgroundColor: "rgba(50,50,50,0.5)" },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.secondary.main },
      subtitle: { color: muiTheme.palette.primary.main }
    },
    shine: {
      root: { backgroundColor: "#5b1d20" },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.secondary.main },
      subtitle: { color: muiTheme.palette.secondary.main }
    },
    roma: {
      root: { backgroundColor: "#001852" },
      title: { color: muiTheme.palette.text.secondary },
      value: { color: muiTheme.palette.secondary.main },
      icon: { color: muiTheme.palette.error.main },
      subtitle: { color: muiTheme.palette.text.secondary }
    },
    infographic: {
      root: { backgroundColor: "#27727b" },
      title: { color: muiTheme.palette.text.secondary },
      value: { color: "inherit" },
      icon: { color: muiTheme.palette.error.main },
      subtitle: { color: muiTheme.palette.text.secondary }
    }
  };

  const getColor = (path: string) =>
    get(options, path, false) || get(themes[theme], path);

  const backgroundColor = getColor("root.backgroundColor");
  const titleColor = getColor("title.color");
  const valueColor = getColor("value.color");
  const iconColor = getColor("icon.color");
  const subtitleColor = getColor("subtitle.color");

  const rootStyles = { ...themes[theme].root, backgroundColor };

  const titleStyles = {
    ...themes[theme].title,
    ...get(options, "title", {}),
    color: titleColor
  };

  const valueStyles = {
    ...themes[theme].value,
    ...get(options, "value", {}),
    color: valueColor
  };

  const iconStyles = {
    ...themes[theme].icon,
    ...get(options, "icon", {}),
    color: iconColor
  };

  const subtitleStyles = {
    ...themes[theme].subtitle,
    ...get(options, "subtitle", {}),
    color: subtitleColor
  };

  return (
    <div className={classes.root} style={rootStyles}>
      <Typography
        variant="body1"
        component="span"
        color="primary"
        className={clx(classes.title)}
        style={{ display: getDisplay(options, "title"), ...titleStyles }}
      >
        {name}
      </Typography>
      <Typography
        variant="body1"
        component="span"
        color="primary"
        className={clx(classes.value)}
        style={{ display: getDisplay(options, "value"), ...valueStyles }}
      >
        {data.value}
      </Typography>
      <div
        className={clx(classes.icon)}
        style={{ display: getDisplay(options, "icon") }}
      >
        <ScalarIcon icon={icon} style={iconStyles} />
      </div>
      <Typography
        variant="subtitle1"
        component="span"
        color="primary"
        className={clx(classes.subtitle)}
        style={{
          display: getDisplay(options, "subtitle"),
          ...subtitleStyles
        }}
      >
        {data.title}
      </Typography>
    </div>
  );
};

export default Scalar;
