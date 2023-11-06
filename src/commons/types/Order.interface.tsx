import { IIngredients } from "./Ingredients.interface";
interface IOrder {
  ingredients: IIngredients;
  price: number;
  customer: {
    name: string;
    address: {
      society: string;
      phase: string;
      zipCode: string;
    };
    email: string;
  };
  deliveryMethod: string;
}

export type { IOrder };
