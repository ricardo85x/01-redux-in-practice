import { Reducer } from "redux";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case "ADD_PRODUCT_TO_CART": {
      const { product } = action.payload;

      if (product) {
        const foundProduct = state.items.find(
          (p) => p.product.id === product.id
        );

        if (foundProduct) {
          return {
            ...state,
            items: state.items.map((p) => {
              return {
                ...p,
                quantity: p.product.id === foundProduct.product.id ? p.quantity + 1 : p.quantity,
              };
            }),
          };
        } else {
          return {
            ...state,
            items: [
              ...state.items,
              {
                product,
                quantity: 1,
              },
            ],
          };
        }
      }

      return state;
    }

    default: {
      return state;
    }
  }
};

export default cart;
