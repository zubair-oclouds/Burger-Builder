import React from "react";
import classes from "./DrawerToggle.module.css";

const DrawerToggle = (props: IDrawerToggle) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

interface IDrawerToggle {
  clicked: () => void;
}

export default DrawerToggle;
