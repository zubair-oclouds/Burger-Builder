import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props: INavigationItemProps) => {
  return (
    <li className={classes.NavigationItem}>
      {/* <a href={props.link} className={props.active ? classes.active : ""}>
        {" "}
        {props.children}
      </a> */}

      <NavLink
        to={props.link}
        className={({ isActive }) => (isActive ? classes.active : "")}
        end
      >
        {props.children}
      </NavLink>
    </li>
  );
};

interface INavigationItemProps {
  link: string;
  children: any;
}

export default NavigationItem;
