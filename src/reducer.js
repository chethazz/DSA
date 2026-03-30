import { combineReducers } from "redux";
import filtersReducer from "./features/filters/filtersSlice";
import todosReducer from "./features/todoSlice";

export const rootReducer = combineReducers({
	todos: todosReducer,
	filters: filtersReducer,
});
