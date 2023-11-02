import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { IIngredients } from "../../commons/types/Ingredients.interface";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { IOrder } from "../../commons/types/Order.interface";
import { Link, useNavigate } from "react-router-dom";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  // navigate = useNavigate()
  state: IBurgerBuilderState = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount(): void {
    axios
      .get("/Ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order: IOrder = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Zubair Khan",
        address: {
          society: "DHA",
          phase: "4",
          zipCode: "50001",
        },
        email: "muhammadzubair.khan@ocloudsolutions.net",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const orderSummary = this.state.purchasing ? (
      <Modal
        show={this.state.purchasing}
        modalClosed={this.purchaseCancelHandler}
      >
        {this.state.loading ? (
          <Spinner />
        ) : (
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        )}
      </Modal>
    ) : null;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </>
      );
    }

    if (this.state.error) return <p>Ingredients can't be loaded!</p>;

    return (
      <>
        {orderSummary}
        {burger}
      </>
    );
  }
}

interface IBurgerBuilderState {
  ingredients: IIngredients;
  totalPrice: number;
  purchaseable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

export default withErrorHandler(BurgerBuilder, axios);
