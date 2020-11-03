export const remaining = state =>
	state.todos.filter(todo => !todo.completed).length
export const anyRemaining = (_state, getters) => !!getters.remaining
export const isRemaining = state =>
	state.todos.filter(todo => todo.completed).length > 0
export const todosFiltered = state => {
	switch (state.filter) {
		case 'active':
			return state.todos.filter(todo => !todo.completed)
		case 'completed':
			return state.todos.filter(todo => todo.completed)
		default:
			return state.todos
	}
}
