import { combineReducers, createStore } from "redux"
import { tableReducer } from "./tableReducer"

const reducer = combineReducers({
  tableReducer
})

export const store = createStore(reducer)