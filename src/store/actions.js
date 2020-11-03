export const toggleCompletedAll = ({ commit }, payload) =>
	commit('toggleCompletedAll', payload)
export const clearAllCompleted = ({ commit }) => commit('clearAllCompleted')
export const chooseFilter = ({ commit }, payload) =>
	commit('chooseFilter', payload)
export const addTodo = ({ commit }, payload) => commit('addTodo', payload)
export const doneEdit = ({ commit }, payload) => commit('doneEdit', payload)
export const removeTodo = ({ commit }, payload) => commit('removeTodo', payload)
