import { combineReducers } from "redux";
import { usersReducer } from "./Table/reducers";

export const rootReducer = combineReducers({
  tableData: usersReducer,
});
