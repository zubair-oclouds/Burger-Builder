import React from "react";
import { IIngredients } from "../../../commons/types/Ingredients.interface";
import Button from "../../UI/Button/Button";

const OrderSummary = (props: IOrderSummaryProps) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {props.ingredients[key as keyof IIngredients]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following indredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        Total Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

interface IOrderSummaryProps {
  ingredients: IIngredients;
  totalPrice: number;
  purchaseCancelled: () => void;
  purchaseContinued: () => void;
}

export default OrderSummary;
