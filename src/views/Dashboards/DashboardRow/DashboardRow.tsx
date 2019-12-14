import React, { useState } from "react";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { displayErrMsg } from "utility";
import { DeleteButton } from "components/Button";
import {
  useDashboards,
  TDashboards,
  TActions,
  TDashboard
} from "components/Dashboard";
import ChangeOrder from "./ChangeOrder";
import EditButton from "./EditButton";
import { AccessButton } from "..";

const DashboardRow = (props: { dashboard: TDashboard }) => {
  const actions = useDashboards()[1];
  const { enqueueSnackbar } = useSnackbar();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { dashboard } = props;

  const handleVisibilityChange = () => {
    const { isVisible, duration } = dashboard.config.slide;
    actions.setSlideConfig(dashboard, { isVisible: !isVisible, duration });
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { isVisible } = dashboard.config.slide;
    const value = +event.target.value;
    const duration = value < 10 ? 10 : value;
    actions.setSlideConfig(dashboard, {
      isVisible,
      duration
    });
  };

  const handleMoveUp = () => {
    actions.moveUp(dashboard);
  };

  const handleMoveDown = () => {
    actions.moveDown(dashboard);
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    actions
      .remove(dashboard)
      .catch(displayErrMsg(enqueueSnackbar))
      .finally(() => setDeleteLoading(false));
  };

  const handleEdit = (name: string) => {
    setRenameLoading(true);
    actions
      .update(dashboard, { name })
      .catch(displayErrMsg(enqueueSnackbar))
      .finally(() => setRenameLoading(false));
  };

  return (
    <TableRow>
      <TableCell>{dashboard.id}</TableCell>
      <TableCell>
        <Typography variant="body1" component="p" title={dashboard.name}>
          {dashboard.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Checkbox disabled checked={dashboard.shared} color="primary" />
      </TableCell>
      <TableCell>
        <Switch
          checked={get(dashboard, "config.slide.isVisible", false)}
          onChange={handleVisibilityChange}
          color="primary"
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          inputProps={{
            min: 10,
            max: 600,
            step: 10
          }}
          value={get(dashboard, "config.slide.duration", 60)}
          onChange={handleDurationChange}
          margin="normal"
        />
      </TableCell>
      <TableCell style={{ textAlign: "end", minWidth: 170 }}>
        {!dashboard.shared && (
          <>
            <AccessButton dashboard={dashboard} />
            <EditButton
              name={dashboard.name}
              loading={renameLoading}
              onEdit={handleEdit}
            />
            <DeleteButton onDelete={handleDelete} loading={deleteLoading} />
          </>
        )}
        <ChangeOrder onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} />
      </TableCell>
    </TableRow>
  );
};

export default DashboardRow;
