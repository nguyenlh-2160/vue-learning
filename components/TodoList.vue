<template>
  <div>
    <input
      v-model.trim="title"
      type="text"
      class="todo-input"
      placeholder="What needs to be done?"
      @keyup.enter="addTodo"
    />

    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div v-for="todo in todosFiltered" :key="todo.id" class="todo-item">
        <div class="todo-item-left">
          <input
            v-model="todo.completed"
            type="checkbox"
            class="todo-checkbox"
          /><span class="checkmark"></span>
          <div
            v-if="!todo.edit"
            class="todo-item-label"
            :class="{ completed: todo.completed }"
            @dblclick="editTodo(todo)"
          >
            {{ todo.title }}
          </div>
          <input
            v-else
            v-model.trim="todo.title"
            v-focus
            type="text"
            class="todo-item-edit"
            @blur="doneEdit(todo)"
            @keyup.enter="$event.target.blur()"
            @keyup.esc="cancelEdit(todo)"
          />
        </div>
        <div class="remove-item" @click="removeTodo(todo)">
          &times;
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input
            type="checkbox"
            class="todo-checkbox"
            :checked="!anyRemaining"
            @change="toggleAllCompleted($event.target.checked)"
          />Check all</label
        >
      </div>
      <div>{{ remaining }} item(s) left</div>
    </div>

    <div class="extra-container">
      <div>
        <button
          v-for="(value, index) in filterType"
          :key="index"
          class="capital-text"
          :class="{ active: filter === value.type }"
          @click="chooseFilter(value.type)"
        >
          {{ value.type }}
        </button>
      </div>
      <div>
        <transition
          name="fade"
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <button v-if="isRemaining" @click="clearAllCompleted">
            Clear completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Getter, Action, Component, State } from 'nuxt-property-decorator'
import { filterType } from './types'
import { todo, AppState } from '~/types'

@Component
export default class TodoListComponent extends Vue {
  private title: string = ''
  private id: number = 3
  private filter: string = 'all'
  private beforeEditTitle: string = ''
  private filterType: Array<filterType> = [
    { type: 'all' },
    { type: 'active' },
    { type: 'completed' }
  ]

  @State('app') state!: AppState

  @Getter('app/remaining') remaining!: number
  @Getter('app/isRemaining') isRemaining!: boolean
  @Getter('app/anyRemaining') anyRemaining!: boolean
  @Getter('app/todosFiltered') todosFiltered!: Array<todo>

  @Action('app/addTodo') add!: Function
  @Action('app/toggleAllCompleted') toggle!: Function
  @Action('app/clearAllCompleted') clear!: Function
  @Action('app/chooseFilter') chooseF!: Function
  @Action('app/doneEdit') done!: Function
  @Action('app/removeTodo') remove!: Function

  addTodo() {
    if (!this.title) return
    this.add({
      title: this.title,
      id: this.id
    })
    this.title = ''
    this.id++
  }

  toggleAllCompleted(checked: boolean) {
    this.toggle(checked)
  }

  clearAllCompleted() {
    this.clear()
  }

  chooseFilter(type: string) {
    this.chooseF(type)
    this.filter = type
  }

  editTodo(todo: todo) {
    this.beforeEditTitle = todo.title
    todo.edit = true
  }

  cancelEdit(todo: todo) {
    todo.title = this.beforeEditTitle
    todo.edit = false
  }

  doneEdit(todo: todo) {
    if (!todo.title) {
      todo.title = this.beforeEditTitle
      todo.edit = false
    } else {
      const index: number = this.state.todoList.todos.findIndex(
        (item) => item.id === todo.id
      )
      this.done({
        index,
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        edit: todo.edit
      })
    }
  }

  removeTodo(todo: todo) {
    const index: number = this.state.todoList.todos.findIndex(
      (item) => item.id === todo.id
    )
    this.remove(index)
  }
}
</script>

<style lang="scss" scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 25px;
  &:focus {
    outline: 2;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: flex;
  justify-content: space-between;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 20px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  &:focus {
    outline-color: red;
  }
}
.todo-checkbox {
  cursor: pointer;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    color: black;
  }
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-top: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}
.capital-text {
  text-transform: capitalize;
}

.active {
  background: lightgreen;
}
</style>
