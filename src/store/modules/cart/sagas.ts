import { AxiosResponse } from "axios";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from "./actions";
import { ActionTypes } from "./types";

type CheckPRoductStockActionType = ReturnType<typeof addProductToCartRequest>

type IStockResponseType = {
  id: number
  quantity: number
}

function* checkProductStock({payload}: CheckPRoductStockActionType) {
  console.log("Adicionando no carrinho", payload);
  const {product} = payload;
  
  const currentQuantity: number = yield select((state:IState) => {
    return state.cart.items
        .find(item => item.product.id === product.id)?.quantity ?? 0
  })

  const availableStockResponse : AxiosResponse<IStockResponseType> = 
    yield call(api.get, `stock/${product.id}`)

  if(availableStockResponse.data.quantity > currentQuantity) {
    console.log("Good to go")
    yield put(addProductToCartSuccess(product))

  } else {
    console.log("This product is out of stock")
    yield put(addProductToCartFailure(product.id))
  }

  console.log("QTD:", currentQuantity)

}

export default all([takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)]);
