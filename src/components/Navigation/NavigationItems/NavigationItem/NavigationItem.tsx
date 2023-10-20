import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = (props: INavigationItemProps) => {
  return (
    <li className={classes.NavigationItem}>
      <a href={props.link} className={props.active ? classes.active : ""}>
        {" "}
        {props.children}
      </a>
    </li>
  );
};

interface INavigationItemProps {
  link: string;
  active?: boolean;
  children: any;
}

export default NavigationItem;
