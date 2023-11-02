import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { useLoaderData } from "react-router-dom";
import { IOrder } from "../../commons/types/Order.interface";

const Orders = () => {
  const orders = useLoaderData() as IOrders;
  const fetchedOrders = Object.keys(orders).map((key: any) => ({
    ...orders[key],
    id: key,
  }));

  const ordersInJsx = fetchedOrders.map((order) => {
    return (
      <Order
        key={order.id}
        price={order.price}
        ingredients={order.ingredients}
      />
    );
  });

  return <div>{ordersInJsx}</div>;
};

interface IOrders {
  [key: string]: IOrder;
}

export default Orders;

export async function loader() {
  const response = await axios.get("/orders.json");
  const resData: IOrders = await response.data;
  return resData;
}
