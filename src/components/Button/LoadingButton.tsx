import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Theme, createStyles } from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Progress from "@material-ui/core/CircularProgress";

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
        1
      )
    }
  });

type TLoadingButtonProps = {
  text: string;
  icon?: React.ComponentType<SvgIconProps>;
  loading?: boolean;
  children?: React.ReactNode;
  classes: { margin: string };
} & ButtonProps;

class LoadingButton extends Component<TLoadingButtonProps> {
  render() {
    const {
      classes,
      icon: Icon,
      text,
      loading = false,
      children,
      ...rest
    } = this.props;
    return (
      <Button color="primary" variant="contained" {...rest}>
        {loading && (
          <Progress color="inherit" className={classes.margin} size={28} />
        )}
        {!!Icon && !loading && <Icon className={classes.margin} />}
        <Typography gutterBottom variant="button" display="block">
          {text}
        </Typography>
        {children}
      </Button>
    );
  }
}

export default withStyles(styles)(LoadingButton);
