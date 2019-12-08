import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    [theme.direction === "rtl" ? "marginLeft" : "marginRight"]: theme.spacing(
      2.5
    )
  }
}));

type ME = React.MouseEvent<HTMLButtonElement, MouseEvent>;

type propsType = {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (e: ME, p: number) => void;
};

const TableActions = (props: propsType) => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: ME) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: ME) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: ME) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: ME) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="صفحه اول"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="صفحه قبلی"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="صفحه بعدی"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="صفحه آخر"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

export default TableActions;
