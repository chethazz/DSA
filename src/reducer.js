import filtersReducer from "./features/filters/filtersSlice";
import todosReducer from "./features/todoSlice";

export default function rootReducer(state = {}, action) {
	return {
		todos: todosReducer(state.todos, action),
		filters: filtersReducer(state.filters, action),
	};
}
