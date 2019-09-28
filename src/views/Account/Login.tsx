import React, { useEffect, useState } from "react";
import { Redirect, RouteProps } from "react-router";
import { get } from "lodash";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import InputIcon from "@material-ui/icons/Input";
import FullContent from "hoc/FullContent";
import { LoadingButton } from "components/Button";
import Logo from "components/Logo";
import { AuthService } from "components/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3),
      padding: theme.spacing(4)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    }
  })
);

export default function Login(props: RouteProps) {
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const parseQueryString = (queryString = "") => {
      return queryString
        ? queryString
            .split("&")
            .map(str => {
              let [key, value] = str.split("=");
              return { [key]: decodeURI(value) };
            })
            .reduce((prev, curr) => Object.assign(prev, curr))
        : null;
    };

    async function fetchToken(ssoCode: string) {
      try {
        await AuthService.fetchToken(ssoCode);
        setRedirect(true);
      } catch (error) {
        setError(true);
      }
    }

    const qs = parseQueryString(window.location.search.slice(1));
    if (qs && qs.code) {
      fetchToken(qs.code);
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = AuthService.getLoginUrl();
  };

  if (redirect) {
    const { from } = get(props, "location.state", { from: { pathname: "/" } });
    return <Redirect to={from} />;
  }

  return (
    <FullContent>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10} sm={7} md={6} lg={3}>
          <Zoom in={true}>
            <Paper className={classes.root} elevation={12}>
              <Logo />
            </Paper>
          </Zoom>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <LoadingButton
                  icon={InputIcon}
                  text="ورود به داشبورد"
                  loading={loading}
                  onClick={handleLogin}
                />
              </Slide>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {hasError && (
                <Typography gutterBottom variant="body1" color="error">
                  ورود ناموفق بود، دوباره تلاش کنید
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FullContent>
  );
}
