export * from './state'

export declare type todoList = {
  filter: string
  todos: Array<todo>
}

export declare type todo = {
  completed: boolean
  edit: boolean
  title: string
  id: number
}
