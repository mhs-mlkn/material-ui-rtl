import React, { useState } from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import IconButton from "@material-ui/core/IconButton";
import TuneIcon from "@material-ui/icons/Tune";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { ReportService } from "components/Report";
import "jsoneditor-react/es/editor.min.css";

let options: object;

type propsType = {
  instanceId: number;
  json: object;
  onChange: (p: object) => void;
};

const Settings = (props: propsType) => {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { instanceId, json, onChange } = props;

  const handleChange = (value: object) => (options = value);

  const toggleOpen = () => setOpen(!open);

  const handleApplyClick = () => {
    if (!!options) {
      onChange(options);
    }
  };

  const handleSaveClick = () => {
    if (!options) {
      return toggleOpen();
    }
    setUpdating(true);
    ReportService.update(instanceId, {
      config: JSON.stringify(options)
    })
      .then(() => onChange(options))
      .finally(() => setUpdating(false));
  };

  const actions = (
    <>
      <Button
        size="small"
        color="primary"
        text="اعمال و ذخیره"
        loading={updating}
        onClick={handleSaveClick}
        style={{ margin: "0 8px" }}
      />
      <Button
        size="small"
        color="secondary"
        text="اعمال"
        onClick={handleApplyClick}
      />
      <Button size="small" color="default" text="خروج" onClick={toggleOpen} />
    </>
  );

  return (
    <>
      <IconButton color="primary" title="تنظیمات نمودار" onClick={toggleOpen}>
        <TuneIcon />
      </IconButton>
      <Modal open={open} onClose={toggleOpen} actions={actions}>
        <Editor
          value={json}
          mode="form"
          onChange={handleChange}
          htmlElementProps={{ style: { direction: "ltr", height: "100%" } }}
        />
      </Modal>
    </>
  );
};

export default Settings;
