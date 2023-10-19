import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props: IBuildControlProps) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.ingredientRemoved}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.ingredientAdded}>
        More
      </button>
    </div>
  );
};

interface IBuildControlProps {
  label: string;
  ingredientAdded: () => void;
  ingredientRemoved: () => void;
  disabled: boolean;
}

export default BuildControl;
