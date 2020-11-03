export const toggleCompletedAll = (state, payload) =>
	state.todos.forEach(todo => (todo.completed = payload))
export const clearAllCompleted = state =>
	(state.todos = state.todos.filter(todo => !todo.completed))
export const chooseFilter = (state, payload) => (state.filter = payload)
export const addTodo = (state, payload) => {
	state.todos.push({
		id: payload.idForTodo,
		title: payload.newTodo,
		completed: false,
		edit: false
	})
}
export const doneEdit = (state, payload) => {
	state.todos.splice(payload.index, 1, {
		id: payload.id,
		title: payload.title,
		completed: payload.completed,
		edit: payload.edit,
		beforeEditTitle: ''
	})
}
export const removeTodo = (state, payload) => state.todos.splice(payload, 1)
