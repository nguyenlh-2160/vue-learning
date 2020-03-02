<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo()">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
            <div class="todo-item-left">
                <input type="checkbox" v-model="todo.completed" class="todo-checkbox"><span class="checkmark"></span>
                <div v-if="!todo.edit" class="todo-item-label" :class="{ completed : todo.completed }" @dblclick="editTodo(todo)">{{ todo.title }}</div>
                <input v-else type="text"  v-model="todo.title" class="todo-item-edit" 
                    @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
            </div>
            <div class="remove-item" @click="removeTodo(index)">
                &times;
            </div>
        </div>
    </transition-group>
    <div class="extra-container">
        <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check all</label></div>
        <div>{{ remaining }} items left </div>
    </div>

    <div class="extra-container">
        <div>
            <button :class="{ active: filter == 'all'}" @click="filter='all'">All</button>
            <button :class="{ active: filter == 'active'}" @click="filter='active'">Active</button>
            <button :class="{ active: filter == 'completed'}" @click="filter='completed'">Completed</button>
        </div>

        <div>

            <transition name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                <button v-if="showClearButton" @click="clearAllCompleted"> Clear completed</button>
            </transition>
        </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'todo-list',

  data () {
    return {
        newTodo: '',
        idForTodo: 3,
        beforeEditTitle: '',
        filter: '',
        todos: []
    }
  },

  computed: {
      remaining() {
          return this.todos.filter(todo => !todo.completed).length
      },

      anyRemaining() {
          return this.remaining != 0
      },

      todosFiltered() {
        if (this.filter == 'all') {    
            return this.todos 
        } else if (this.filter == 'active') {
            return this.todos.filter(todo => !todo.completed)
        } else if (this.filter == 'completed') {
            return this.todos.filter(todo => todo.completed)
        }  return this.todos
      },

      showClearButton() {
          return this.todos.filter(todo => todo.completed).length > 0
      },
  },

  methods: {
      addTodo() {
          if (this.newTodo.trim().length == 0){ 
              return 
            }
          this.todos.push({
              id: this.idForTodo,
              title: this.newTodo,
              completed: false,
              edit: false
          })
          
          this.newTodo = '',
          this.idForTodo++
      },

      editTodo(todo) {
          this.beforeEditTitle = todo.title,
          todo.edit = true
      },
    
      doneEdit(todo) {
          if (todo.title.trim() == '') { 
              todo.title = this.beforeEditTitle
            }  
          todo.edit = false  
      },
      
      cancelEdit(todo) {
          todo.title = this.beforeEditTitle,
          todo.edit = false
      },

      removeTodo(index) {
          this.todos.splice(index, 1)
      },
      
      checkAllTodos() {
          this.todos.forEach((todo) => todo.completed = event.target.checked)
      },

      clearAllCompleted() {
          this.todos = this.todos.filter(todo => !todo.completed)
      }
  },

  directives: {
      focus: {
          inserted: function(el) {
              el.focus()
          }
      }

  }
}

</script>

<style lang="scss">

    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

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

    .active {
        background: lightgreen;
    }
</style>
