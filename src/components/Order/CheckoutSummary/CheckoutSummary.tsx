import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutSummary = (props: any) => {
  const navigate = useNavigate();
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={() => navigate(-1)}>
        CANCLE
      </Button>
      <Button btnType="Success" clicked={() => 1}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
