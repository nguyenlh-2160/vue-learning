<template>
	<div>
		<input
			type="text"
			class="todo-input"
			placeholder="What needs to be done?"
			v-model.trim="newTodo"
			@keyup.enter="addTodo"
		/>
	</div>
</template>

<script>
export default {
	name: 'todo-input',

	data() {
		return {
			newTodo: '',
			idForTodo: 0
		}
	},

	methods: {
		addTodo() {
			if (!this.newTodo) return
			this.$store.dispatch('addTodo', {
				idForTodo: this.idForTodo,
				newTodo: this.newTodo
			})
			this.idForTodo++
			this.newTodo = ''
		}
	}
}
</script>
