import React, { Component, useEffect, useState } from "react";
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

const INGREDIENT_PRICES: IIngredients = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState<IIngredients>({
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  });
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchaseable, setPurchaseable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // componentDidMount(): void {
  //   axios
  //     .get("/Ingredients.json")
  //     .then((response) => {
  //       setState({ ingredients: response.data });
  //     })
  //     .catch((error) => {
  //       setState({ error: true });
  //     });
  // }

  useEffect(() => {
    updatePurchaseState();
    console.log("useEffect called");
  }, [ingredients]);

  const updatePurchaseState = () => {
    for (let key in ingredients) {
      if (ingredients[key as keyof IIngredients] > 0) {
        setPurchaseable(true);
        return;
      }
    }
    setPurchaseable(false);
  };

  const addIngredientHandler = (type: keyof IIngredients) => {
    setIngredients({ ...ingredients, [type]: ingredients[type] + 1 });
    setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
  };

  const removeIngredientHandler = (type: keyof IIngredients) => {
    if (ingredients[type] === 0) return;
    setIngredients({ ...ingredients, [type]: ingredients[type] - 1 });
    setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    navigate("checkout", {
      state: { ingredients: ingredients, price: totalPrice },
    });
    // setState({ loading: true });
    // const order: IOrder = {
    //   ingredients: state.ingredients,
    //   price: state.totalPrice,
    //   customer: {
    //     name: "Zubair Khan",
    //     address: {
    //       society: "DHA",
    //       phase: "4",
    //       zipCode: "50001",
    //     },
    //     email: "muhammadzubair.khan@ocloudsolutions.net",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     setState({ loading: false, purchasing: false });
    //   });
  };

  const orderSummary = purchasing ? (
    <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
      {loading ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={ingredients}
          totalPrice={totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      )}
    </Modal>
  ) : null;

  let burger = <Spinner />;
  if (ingredients) {
    burger = (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientRemoved={removeIngredientHandler}
          ingredients={ingredients}
          price={totalPrice}
          purchaseable={purchaseable}
          ordered={purchaseHandler}
        />
      </>
    );
  }

  if (error) return <p>Ingredients can't be loaded!</p>;

  return (
    <>
      {orderSummary}
      {burger}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
