import React from "react";
import Chip from "components/Chip";
import { TUser } from ".";

const User = (props: { user: TUser; onDelete: (u: TUser) => any }) => {
  const { user, onDelete } = props;

  const handleDelete = () => {
    onDelete(user);
  };

  return <Chip label={user.user.username} onDelete={handleDelete} />;
};

export default User;
