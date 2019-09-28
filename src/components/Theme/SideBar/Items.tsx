import React from "react";
import List from "@material-ui/core/List";
import { TSideBarLink } from "config";
import Item from "./Item";

const Items = (props: { items: TSideBarLink[]; nested?: boolean }) => {
  const { items, nested = false } = props;

  return (
    <List>
      {items.map((item: TSideBarLink, index) => (
        <Item key={index} item={item} nested={nested} />
      ))}
    </List>
  );
};

export default Items;
