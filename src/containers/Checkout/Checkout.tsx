import React, { useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { IIngredients } from "../../commons/types/Ingredients.interface";
import { useLocation, useNavigate } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { IOrder } from "../../commons/types/Order.interface";
import axios from "../../axios-orders";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const location = useLocation();
  const [ingredients, setIngredients] = useState<IIngredients>(
    location.state.ingredients
  );
  const navigate = useNavigate();

  const changeNameHandler = (text: string) => {
    setName(text);
  };
  const changeEmailHandler = (text: string) => {
    setEmail(text);
  };
  const changeStreetHandler = (text: string) => {
    setStreet(text);
  };
  const changePostalHandler = (text: string) => {
    setPostal(text);
  };
  const orderHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const order: IOrder = {
      ingredients: location.state.ingredients,
      price: location.state.price,
      customer: {
        name: name,
        email: email,
        address: {
          society: "DHA",
          phase: street,
          zipCode: postal,
        },
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        console.log("order has been placed");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <CheckoutSummary ingredients={ingredients} />
      <ContactData
        changeNameHandler={changeNameHandler}
        changeEmailHandler={changeEmailHandler}
        changeStreetHandler={changeStreetHandler}
        changePostalHandler={changePostalHandler}
        orderHandler={orderHandler}
      />
    </div>
  );
};

export default Checkout;
