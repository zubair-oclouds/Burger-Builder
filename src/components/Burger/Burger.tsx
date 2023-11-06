import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import { IIngredients } from "../../commons/types/Ingredients.interface";

const Burger = (props: IBurgerProps) => {
  let ingredientsCount: number = 0;
  const ingredientsArray = Object.keys(props.ingredients).map((key) => {
    const ingredientType = key as keyof typeof props.ingredients; // Type assertion
    ingredientsCount += props.ingredients[ingredientType];
    return [...Array(props.ingredients[ingredientType])].map((_, i) => (
      <BurgerIngredients key={key + i} type={ingredientType} />
    ));
  });

  return (
    <>
      <div className={classes.Burger}>
        <BurgerIngredients type="bread-top" />
        {ingredientsCount !== 0 ? (
          ingredientsArray
        ) : (
          <p>Please start adding ingredients</p>
        )}
        <BurgerIngredients type="bread-bottom" />
      </div>
    </>
  );
};

interface IBurgerProps {
  ingredients: IIngredients;
}
export default Burger;
