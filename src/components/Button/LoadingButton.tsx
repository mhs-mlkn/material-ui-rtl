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
  icon: React.ComponentType<SvgIconProps>;
  loading: boolean;
  classes: { margin: string };
} & ButtonProps;

class LoadingButton extends Component<TLoadingButtonProps> {
  getIcon() {
    const { classes, icon: Icon } = this.props;
    return <Icon className={classes.margin} />;
  }

  render() {
    const { classes, icon, text, loading, ...rest } = this.props;
    return (
      <Button color="primary" variant="contained" {...rest}>
        {loading && (
          <Progress color="inherit" className={classes.margin} size={28} />
        )}
        {icon && !loading && this.getIcon()}
        <Typography gutterBottom variant="button" display="block">
          {text}
        </Typography>
      </Button>
    );
  }
}

export default withStyles(styles)(LoadingButton);
