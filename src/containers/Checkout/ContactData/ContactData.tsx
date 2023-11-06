import React, { ChangeEventHandler, Component, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import buttonClasses from "../../../components/UI/Button/Button.module.css";
import Input from "../../../components/UI/Input/Input";

const ContactData = (props: IContactDataProps) => {
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      <form action="">
        <Input
          inputtype="input"
          className={classes.Input}
          type="text"
          name="name"
          onChange={(event: any) =>
            props.changeNameHandler(event?.target.value)
          }
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          className={classes.Input}
          type="email"
          name="email"
          onChange={(event: any) =>
            props.changeEmailHandler(event?.target.value)
          }
          placeholder="Your Email"
        />
        <Input
          inputtype="input"
          className={classes.Input}
          type="text"
          name="street"
          onChange={(event: any) =>
            props.changeStreetHandler(event?.target.value)
          }
          placeholder="Street"
        />
        <Input
          inputtype="input"
          className={classes.Input}
          type="text"
          name="postal"
          onChange={(event: any) =>
            props.changePostalHandler(event?.target.value)
          }
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
