import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = (props: IBackdropProps) => {
  return (
    <div>
      {props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked}></div>
      ) : null}
    </div>
  );
};

interface IBackdropProps {
  show: boolean;
  clicked?: () => void;
}

export default Backdrop;
