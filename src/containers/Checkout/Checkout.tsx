import React, { useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { IIngredients } from "../../commons/types/Ingredients.interface";
import { useLocation, useNavigate } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { IOrder } from "../../commons/types/Order.interface";
import axios from "../../axios-orders";
import { object, string, number, date, InferType } from "yup";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import classes from "./Checkout.module.css";

const Checkout = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [street, setStreet] = useState("");
  // const [postal, setPostal] = useState("");
  const location = useLocation();
  const ingredients = location.state.ingredients;
  const price = location.state.price;
  const navigate = useNavigate();

  const initialValues = {
    customer: {
      name: "",
      email: "",
      address: {
        society: "",
        zipcode: "",
      },
    },
    deliveryMethod: "fastest",
  };

  const validationSchema = object({
    name: string().required("Required"),
    email: string().email("Invalid email format").required("Required"),
    // society: string().required("Required"),
    // zipcode: number().required("Required").positive().integer(),
    address: object().shape({
      society: string().required("Required"),
      zipcode: number()
        .required("Required")
        .positive("Invalid Postal Code")
        .integer("Invalid Postal Code"),
    }),
  });

  // const changeNameHandler = (text: string) => {
  //   setName(text);
  // };
  // const changeEmailHandler = (text: string) => {
  //   setEmail(text);
  // };
  // const changeStreetHandler = (text: string) => {
  //   setStreet(text);
  // };
  // const changePostalHandler = (text: string) => {
  //   setPostal(text);
  // };
  const onSubmit = (values: any, submitProps: any) => {
    const order: IOrder = {
      ingredients,
      price,
      ...values,
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
      <div className={classes.Form}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form>
                <div className={classes.FormControl}>
                  <label htmlFor="name" className={classes.Label}>
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={classes.Input}
                  />
                  <ErrorMessage name="name">
                    {(error) => <div className={classes.Error}>{error}</div>}
                  </ErrorMessage>
                </div>
                <div className={classes.FormControl}>
                  <label htmlFor="email" className={classes.Label}>
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={classes.Input}
                  />
                  <ErrorMessage name="email">
                    {(error) => <div className={classes.Error}>{error}</div>}
                  </ErrorMessage>
                </div>
                <div className={classes.FormControl}>
                  <label htmlFor="society" className={classes.Label}>
                    Society
                  </label>
                  <Field
                    type="text"
                    id="society"
                    name="address.society"
                    className={classes.Input}
                  />
                  <ErrorMessage name="address.society">
                    {(error) => <div className={classes.Error}>{error}</div>}
                  </ErrorMessage>
                </div>
                <div className={classes.FormControl}>
                  <label htmlFor="zipcode" className={classes.Label}>
                    Postal Code
                  </label>
                  <Field
                    type="text"
                    id="zipcode"
                    name="address.zipcode"
                    className={classes.Input}
                  />
                  <ErrorMessage name="address.zipcode">
                    {(error) => <div className={classes.Error}>{error}</div>}
                  </ErrorMessage>
                </div>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* <ContactData
        changeNameHandler={changeNameHandler}
        changeEmailHandler={changeEmailHandler}
        changeStreetHandler={changeStreetHandler}
        changePostalHandler={changePostalHandler}
        orderHandler={orderHandler}
      /> */}
    </div>
  );
};

export default Checkout;
