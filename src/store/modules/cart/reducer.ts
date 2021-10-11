import { Reducer } from "redux";
import { ICartState } from "./types";
import produce from "immer"

const INITIAL_STATE: ICartState = {
  items: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case "ADD_PRODUCT_TO_CART_SUCCESS": {
        const { product } = action.payload;
  
        if (product) {
          const foundProductIndex = state.items.findIndex(
            (p) => p.product.id === product.id
          );
  
          if (foundProductIndex >= 0) {
             draft.items[foundProductIndex].quantity++
          } else {
            draft.items.push({
              product,
              quantity: 1
            })
          }
        }
  
        break
      }
      
      case "ADD_PRODUCT_TO_CART_FAILURE": {
        console.log("Failure", action.payload)
        break
      }
  
      default: {
        break
      }
    }

  })

  
};

export default cart;
