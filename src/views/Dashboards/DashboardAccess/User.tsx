import React from "react";
import Chip from "components/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TUser } from ".";

const User = (props: { user: TUser; onDelete: (u: TUser) => any }) => {
  const { user, onDelete } = props;
  // const { loading = "" } = user;

  const handleDelete = () => {
    onDelete(user);
  };

  return (
    <Chip
      // icon={loading ? <CircularProgress size={20} /> : undefined}
      label={user.user.username}
      // color={loading ? "secondary" : "primary"}
      // onDelete={!loading ? handleDelete : undefined}
      onDelete={handleDelete}
    />
  );
};

export default User;
