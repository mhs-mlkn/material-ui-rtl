import React, { useState } from "react";
import omit from "lodash/omit";
import clx from "classnames";
import { JsonEditor as Editor } from "jsoneditor-react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TuneIcon from "@material-ui/icons/Tune";
import { Modal } from "components/Modal";
import "jsoneditor-react/es/editor.min.css";

let options: object;

type propsType = {
  json: object;
  onChange: (p: object) => void;
};

const Settings = (props: propsType) => {
  const theme: Theme = useTheme();
  const displayBlock = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const { json, onChange } = props;
  const className = clx({
    "jsoneditor-wrapper": theme.palette.type === "dark"
  });
  const style = { style: { direction: "ltr", height: "100%", flexGrow: 1 } };

  const handleChange = (value: object) => (options = value);

  const toggleOpen = () => setOpen(!open);

  const handleApplyClick = () => {
    if (!!options) {
      onChange(options);
    }
  };

  const actions = (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleApplyClick}
        style={{ margin: "0 8px" }}
      >
        اعمال
      </Button>
      <Button variant="outlined" onClick={toggleOpen}>
        خروج
      </Button>
    </>
  );

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        title="تنظیمات نمودار"
        onClick={toggleOpen}
      >
        <TuneIcon fontSize="small" />
      </IconButton>
      <Modal open={open} onClose={toggleOpen} actions={actions}>
        <div
          className={className}
          style={{ display: displayBlock ? "block" : "flex" }}
        >
          <Editor
            value={omit(json, [
              "dataset",
              "radar",
              "toolbox.feature.saveAsImage",
              "legend.textStyle"
            ])}
            mode="form"
            onChange={handleChange}
            htmlElementProps={style}
          />
        </div>
      </Modal>
    </>
  );
};

export default Settings;
