import { MutationTree } from 'vuex'
import { AppState, todo } from '~/types'

export const mutations: MutationTree<AppState> = {
  addTodo(state: AppState, payload: todo): void {
    state.todoList.todos.push({
      id: payload.id,
      title: payload.title,
      completed: false,
      edit: false
    })
  },

  toggleAllCompleted(state: AppState, payload: boolean): void {
    state.todoList.todos.forEach((todo) => (todo.completed = payload))
  },

  chooseFilter(state: AppState, payload: string): void {
    state.todoList.filter = payload
  },

  doneEdit(state: AppState, payload: any): void {
    state.todoList.todos.splice(payload.index, 1, {
      id: payload.id,
      title: payload.title,
      completed: payload.completed,
      edit: payload.edit
    })
  },

  removeTodo(state: AppState, payload: number): void {
    state.todoList.todos.splice(payload, 1)
  },

  clearAllCompleted(state: AppState): void {
    state.todoList.todos = state.todoList.todos.filter(
      (todo) => !todo.completed
    )
  }
}

export default mutations
