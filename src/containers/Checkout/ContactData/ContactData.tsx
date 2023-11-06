import React, { Component, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import buttonClasses from '../../../components/UI/Button/Button.module.css'

const ContactData = (props: IContactDataProps) => {
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      <form action="">
        <input
          className={classes.Input}
          type="text"
          name="name"
          onChange={(event) => props.changeNameHandler(event?.target.value)}
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          onChange={(event) => props.changeEmailHandler(event?.target.value)}
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          onChange={(event) => props.changeStreetHandler(event?.target.value)}
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          onChange={(event) => props.changePostalHandler(event?.target.value)}
          placeholder="Postal"
        />
        <button
          className={[buttonClasses.Button, buttonClasses["Success"]].join(" ")}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            props.orderHandler(event)
          }
        >
          ORDER
        </button>
        {/* <Button btnType="Success" clicked={props.orderHandler(event)}>
          ORDER
        </Button> */}
      </form>
    </div>
  );
};

interface IContactDataProps {
  changeNameHandler: (text: string) => void;
  changeEmailHandler: (text: string) => void;
  changeStreetHandler: (text: string) => void;
  changePostalHandler: (text: string) => void;
  orderHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default ContactData;
