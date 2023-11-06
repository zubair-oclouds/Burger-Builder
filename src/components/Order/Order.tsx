import React from "react";
import classes from "./Order.module.css";
import { IIngredients } from "../../commons/types/Ingredients.interface";

const Order: React.FC<IOrderProps> = ({ ingredients, price }) => {
  const ingredientsList = Object.keys(ingredients).map((key) => {
    return { name: key, amount: ingredients[key as keyof IIngredients] };
  });

  const ingredientsOutput = ingredientsList.map((ingr) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ingr.name}
      >
        {ingr.name} ({ingr.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>{price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

interface IOrderProps {
  ingredients: IIngredients;
  price: number;
}

export default Order;
