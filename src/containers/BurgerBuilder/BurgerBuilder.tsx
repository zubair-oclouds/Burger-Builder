import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { IIngredients } from "../../commons/types/Ingredients.interface";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state: IBurgerBuilderState = {
    ingredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchaseable: false,
  };

  updatePurchaseState = () => {
    this.setState((prevState: IBurgerBuilderState) => {
      const sum = Object.keys(prevState.ingredients).reduce((acc, key) => {
        acc += prevState.ingredients[key as keyof IIngredients];
        return acc;
      }, 0);
      if (sum <= 0) return { purchaseable: false };
      else return { purchaseable: true };
    });
  };

  addIngredientHandler = (type: keyof IIngredients) => {
    this.setState((prevState: IBurgerBuilderState) => {
      const oldCount: number = prevState.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...prevState.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      return {
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
        ingredients: updatedIngredients,
      };
    });
    this.updatePurchaseState();
  };

  removeIngredientHandler = (type: keyof IIngredients) => {
    const oldCount: number = this.state.ingredients[type];
    if (oldCount <= 0) return;

    this.setState((prevState: IBurgerBuilderState) => {
      const oldCount: number = prevState.ingredients[type];
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...prevState.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      return {
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
        ingredients: updatedIngredients,
      };
    });
    this.updatePurchaseState();
  };

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
        />
      </>
    );
  }
}

interface IBurgerBuilderState {
  ingredients: IIngredients;
  totalPrice: number;
  purchaseable: boolean;
}
