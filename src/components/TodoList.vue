<template>
	<div>
		<todo-input />
		<transition-group
			name="fade"
			enter-active-class="animated fadeInUp"
			leave-active-class="animated fadeOutDown"
		>
			<todo-item
				v-for="todo in todosFiltered"
				:key="todo.id"
				:todo="todo"
				:isCheckAll="!anyRemaining"
			></todo-item>
		</transition-group>
		<div class="extra-container">
			<todo-check />
			<todo-remaining />
		</div>

		<div class="extra-container">
			<todo-filter :filter_type="filter_type"></todo-filter>
			<todo-clear />
		</div>
	</div>
</template>

<script>
import TodoCheck from './TodoCheck'
import TodoClear from './TodoClear'
import TodoFilter from './TodoFilter'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import TodoRemaining from './TodoRemaining'
import { mapGetters } from 'vuex'

export default {
	name: 'todo-list',

	components: {
		TodoCheck,
		TodoClear,
		TodoFilter,
		TodoInput,
		TodoItem,
		TodoRemaining
	},

	computed: {
		...mapGetters(['anyRemaining', 'todosFiltered'])
	},

	data() {
		return {
			filter_type: [{ type: 'all' }, { type: 'active' }, { type: 'completed' }]
		}
	},

	methods: {
		/* addTodo(data) {
			if (data.newTodo.length === 0) return
			this.$store.state.todos.push({
				id: this.idForTodo,
				title: data.newTodo,
				completed: false,
				edit: false
			}),
				this.idForTodo++
		}, */
		/* chooseFilter(filter) {
			this.$store.state.filter = filter
		}, */
		/* doneEdit(data) {
			data.index = this.$store.state.todos.findIndex(
				item => item.id === data.todo.id
			)
			this.$store.state.todos.splice(data.index, 1, data.todo)
		}, */
		/* removeTodo(index) {
			index = this.$store.state.todos.findIndex(item => item.id === index)
			this.$store.state.todos.splice(index, 1)
		} */
		/* toggleCompletedAll() {
			this.$store.state.todos.forEach(
				todo => (todo.completed = event.target.checked)
			)
		}, */
		/* clearAllCompleted() {
			this.$store.state.todos = this.$store.state.todos.filter(
				todo => !todo.completed
			)
		} */
	}
}
</script>

<style lang="scss">
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
	text-transform: capitalize;

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
