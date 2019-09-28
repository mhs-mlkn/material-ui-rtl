import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { TSideBarLinks } from "config";
import Items from "./Items";

const useStyles = makeStyles(theme => ({
  divider: {
    backgroundColor: "#00000026"
  }
}));

const Sections = (props: { sections: TSideBarLinks }) => {
  const { sections } = props;
  const classes = useStyles();

  return (
    <>
      {sections.map((items, i) => (
        <div key={i}>
          <Divider className={classes.divider} />
          <Items items={items} />
        </div>
      ))}
    </>
  );
};

export default Sections;
