import React, { useState, useEffect } from "react";
import {
  useTheme,
  createStyles,
  Theme,
  makeStyles
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

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

type TPropsType = {
  count: number;
  onChange: (p: number, s: number) => any;
};

const Pagination = (props: TPropsType) => {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const { count = 0, onChange } = props;
  const sizeOptions = [12, 24, 36];
  const pageCount = Math.ceil(count / size);
  const pages = new Array(pageCount).fill(0);

  useEffect(() => {
    onChange(page, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleBackButtonClick = () => {
    setPage(page - 1);
  };

  const handleNextButtonClick = () => {
    setPage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    setPage(Math.max(0, pageCount - 1));
  };

  const handlePageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(+event.target.value);
  };

  const handleSizeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSize(+event.target.value);
  };

  const getFrom = () => page * size + 1;
  const getTo = () => Math.min(getFrom() + size - 1, count);

  if (count <= 12) {
    return null;
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.root}>
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar variant="dense">
          <Hidden xsDown>
            <div className={classes.grow} style={{ textAlign: "start" }}>
              <Typography variant="overline" color="textPrimary">
                نمایش {getFrom()} تا {getTo()} از {count}
              </Typography>
            </div>
          </Hidden>
          <div className={classes.grow}>
            <Hidden xsDown>
              <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
              >
                {theme.direction === "rtl" ? (
                  <LastPageIcon fontSize="small" />
                ) : (
                  <FirstPageIcon fontSize="small" />
                )}
              </IconButton>
            </Hidden>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight fontSize="small" />
              ) : (
                <KeyboardArrowLeft fontSize="small" />
              )}
            </IconButton>
            <TextField
              select
              value={page}
              margin="none"
              color="inherit"
              onChange={handlePageChanged}
            >
              {pages.map((_, i: number) => (
                <MenuItem key={i} value={i}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= pageCount - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft fontSize="small" />
              ) : (
                <KeyboardArrowRight fontSize="small" />
              )}
            </IconButton>
            <Hidden xsDown>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= pageCount - 1}
              >
                {theme.direction === "rtl" ? (
                  <FirstPageIcon fontSize="small" />
                ) : (
                  <LastPageIcon fontSize="small" />
                )}
              </IconButton>
            </Hidden>
          </div>
          <div className={classes.grow} style={{ textAlign: "end" }}>
            <Typography variant="overline" color="textPrimary">
              تعداد در صفحه
            </Typography>
            <TextField
              select
              value={size}
              margin="none"
              color="inherit"
              onChange={handleSizeChanged}
            >
              {sizeOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Pagination;
