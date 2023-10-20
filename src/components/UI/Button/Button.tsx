import React from "react";
import classes from "./Button.module.css";

const Button = (props: IButton) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

interface IButton {
  clicked: () => void;
  btnType: string;
  children: any;
}

export default Button;
