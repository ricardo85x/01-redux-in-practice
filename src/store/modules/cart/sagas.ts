import { all, select, takeLatest } from "redux-saga/effects";
import { IState } from "../..";
import { addProductToCart } from "./actions";

type CheckPRoductStockActionType = ReturnType<typeof addProductToCart>

function* checkProductStock({payload}: CheckPRoductStockActionType) {
  console.log("Adicionando no carrinho", payload);
  const {product} = payload;
  
  const currentQuantity: number = yield select((state:IState) => {
    return state.cart.items
        .find(item => item.product.id === product.id)?.quantity ?? 0
  })

  console.log("QTD:", currentQuantity)

}

export default all([takeLatest("ADD_PRODUCT_TO_CART", checkProductStock)]);
