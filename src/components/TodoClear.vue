<template>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'todo-clear',

	computed: {
		...mapGetters(['isRemaining'])
	},

	methods: {
		...mapActions(['clearAllCompleted'])
	}
}
</script>
