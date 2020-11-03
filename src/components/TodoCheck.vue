<template>
	<div>
		<label>
			<input
				type="checkbox"
				class="todo-checkbox"
				:checked="!anyRemaining"
				@change="toggleCompletedAll"
			/>Check all</label
		>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'todo-check',

	computed: {
		...mapGetters(['anyRemaining'])
	},

	methods: {
		toggleCompletedAll(event) {
			const checked = event.target.checked
			this.$store.dispatch('toggleCompletedAll', checked)
		}
	}
}
</script>
