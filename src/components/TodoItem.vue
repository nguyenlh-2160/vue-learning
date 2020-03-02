<template>
	<div class="todo-item">
		<div class="todo-item-left">
			<input
				type="checkbox"
				v-model="completed"
				class="todo-checkbox"
				@change="doneEdit"
			/>
			<div
				v-if="!edit"
				class="todo-item-label"
				:class="{ completed: completed }"
				@dblclick="editTodo"
			>
				{{ title }}
			</div>
			<input
				v-else
				type="text"
				v-model.trim="title"
				class="todo-item-edit"
				@blur="doneEdit"
				@keyup.enter="$event.target.blur()"
				@keyup.esc="cancelEdit"
				v-focus
			/>
		</div>

		<div>
			<div class="remove-item" @click="removeTodo">
				&times;
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'todo-item',

	props: {
		todo: {
			type: Object,
			required: true
		},
		isCheckAll: {
			type: Boolean,
			required: true
		}
	},

	data() {
		return {
			...this.todo
		}
	},

	watch: {
		isCheckAll() {
			this.completed = this.isCheckAll ? true : this.todo.completed
		}
	},

	methods: {
		editTodo() {
			this.beforeEditTitle = this.title
			this.edit = true
		},

		doneEdit() {
			if (!this.title) {
				this.title = this.beforeEditTitle
				this.edit = false
			} else {
				this.$store.dispatch('doneEdit', {
					index: this.index,
					id: this.id,
					title: this.title,
					completed: this.completed,
					edit: this.edit
				})
			}
		},

		cancelEdit() {
			this.title = this.beforeEditTitle
			this.edit = false
		},

		removeTodo() {
			this.$store.dispatch('removeTodo', this.index)
		}

		/* handlePluralize() {
      this.title = this.title + 's'
      const index = this.$store.state.todos.findIndex(
        item => item.id === this.id
      )
      this.$store.state.todos.splice(index, 1, {
        id: this.id,
        title: this.title,
        completed: this.completed,
        edit: this.edit
      })
    } */
	},

	computed: {
		index() {
			return this.$store.state.todos.findIndex(item => item.id === this.id)
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

.completed {
	text-decoration: line-through;
	color: gray;
}
</style>
