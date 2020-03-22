export declare type todoList = {
  filterType: Array<filterType>
  beforeEditTitle: string
  filter: string
  todos: Array<todo>
  newTodo: string
  idForTodo: number
}

export declare type todo = {
  completed: boolean
  edit: boolean
  title: string
  id: number
}

export declare type filterType = {
  type: string
}

export declare type todoInput = {
  title: string
  id: number
}
