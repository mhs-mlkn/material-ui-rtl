import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:
        theme.direction === "rtl"
          ? theme.spacing(0.5, 1, 0.5, 0.5)
          : theme.spacing(0.5, 0.5, 0.5, 1),
      display: "flex",
      alignItems: "center"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

type TSearchInputProps = {
  placeholder?: string;
  initialValue?: string;
  loading?: boolean;
  icon?: React.ComponentType<SvgIconProps>;
  updateOnTyping?: boolean;
  onSubmit: (q: string) => any;
  onChange?: (q: string) => any;
};

const SearchInput = (props: TSearchInputProps) => {
  const classes = useStyles();
  const {
    initialValue = "",
    placeholder = "",
    loading = false,
    icon: Icon = SearchIcon,
    updateOnTyping = false,
    onChange = () => {},
    onSubmit
  } = props;
  const [value, setValue] = useState(initialValue);

  const handleSearchClicked = () => {
    onSubmit(value);
  };

  const handleClearValue = () => {
    if (value) {
      setValue("");
      onChange("");
      onSubmit("");
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (updateOnTyping) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSearchClicked();
    }
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={value}
        disabled={loading}
        placeholder={placeholder}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <IconButton
        className={classes.iconButton}
        disabled={loading}
        onClick={handleClearValue}
      >
        <ClearIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      {loading ? (
        <CircularProgress color="primary" className={classes.iconButton} />
      ) : (
        <IconButton
          color="primary"
          className={classes.iconButton}
          onClick={handleSearchClicked}
        >
          <Icon />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchInput;
