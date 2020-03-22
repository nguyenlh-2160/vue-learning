import { AppState } from '~/types'

export const state = (): AppState => ({
  todoList: {
    todos: [
      {
        id: 1,
        title: 'test',
        completed: false,
        edit: false
      },
      {
        id: 2,
        title: 'test 2',
        completed: true,
        edit: false
      }
    ],
    filter: 'all'
  }
})

export default state
