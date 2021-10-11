import { Reducer } from "redux";
import { ActionTypes, ICartState } from "./types";
import produce from "immer"

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
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
        draft.failedStockCheck = draft.failedStockCheck.filter( id => id !== product.id);
        break
      }
      
      case ActionTypes.addProductToCartFailure: {
        console.log("Failure", action.payload)
        if(draft.failedStockCheck.includes(action.payload.productId) === false) {
          draft.failedStockCheck.push(action.payload.productId)
        }
        break
      }
  
      default: {
        break
      }
    }

  })

  
};

export default cart;
