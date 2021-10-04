import { createStore } from "redux"
import cart from "./modules/cart/reducer"
import rootReducer from "./modules/rootReducer"

const store = createStore(rootReducer)

export default store

