<template>
	<div>
		<button
			v-for="(value, index) in filter_type"
			:key="index"
			:class="{ active: filter === value.type }"
			@click="chooseFilter(value.type)"
		>
			{{ value.type }}
		</button>
	</div>
</template>

<script>
export default {
	name: 'todo-filter',

	props: {
		filter_type: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			filter: 'all'
		}
	},

	methods: {
		chooseFilter(filter) {
			this.$store.dispatch('chooseFilter', filter)
			this.filter = filter
		}
	}
}
</script>
