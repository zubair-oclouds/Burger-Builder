import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { IIngredients } from "../../../commons/types/Ingredients.interface";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props: IBuildControlsProps) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          ingredientAdded={() =>
            props.ingredientAdded(ctrl.type as keyof IIngredients)
          }
          ingredientRemoved={() =>
            props.ingredientRemoved(ctrl.type as keyof IIngredients)
          }
          disabled={
            props.ingredients[ctrl.type as keyof IIngredients] === 0
              ? true
              : false
          }
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

interface IBuildControlsProps {
  ingredientAdded: (type: keyof IIngredients) => void;
  ingredientRemoved: (type: keyof IIngredients) => void;
  ingredients: IIngredients;
  price: number;
  purchaseable: boolean;
  ordered: () => void;
}

export default BuildControls;
