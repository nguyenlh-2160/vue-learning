import { GetterTree } from 'vuex'
import { AppState, todo } from '../../types'

export const getters: GetterTree<AppState, any> = {
  remaining: (state): number =>
    state.todoList.todos.filter((todo) => !todo.completed).length,
  anyRemaining: (_state, getters): boolean => !!getters.remaining,
  isRemaining: (state): boolean =>
    state.todoList.todos.filter((todo) => todo.completed).length > 0,
  todosFiltered: (state): Array<todo> => {
    switch (state.todoList.filter) {
      case 'completed':
        return state.todoList.todos.filter((todo) => todo.completed)
      case 'active':
        return state.todoList.todos.filter((todo) => !todo.completed)
      default:
        return state.todoList.todos
    }
  }
}

export default getters
