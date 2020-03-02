import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TodoRemaining from '@/components/TodoRemaining'
import * as getters from '@/store/getters'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test TodoRemaining.vue file', () => {
	let state
	let store

	beforeEach(() => {
		state = {
			todos: []
		}

		store = new Vuex.Store({
			state,
			getters
		})
	})

	it('No item remaining for empty todos array', () => {
		const wrapper = mount(TodoRemaining, { store, localVue })
		expect(wrapper.find('div').text()).toContain('0 items left')
	})

	it('No item remaining in case todos array has no active items', () => {
		const trueState = {
			todos: [
				{
					id: 1,
					title: 'mutations test 1',
					completed: true,
					edit: false
				}
			]
		}

		store.state.todos = trueState.todos
		const wrapper = mount(TodoRemaining, { store, localVue })
		expect(wrapper.find('div').text()).toContain('0 items left')
	})

	it('item remaining in case todos array has an active item', () => {
		const falseState = {
			todos: [
				{
					id: 1,
					title: 'mutations test 1',
					completed: false,
					edit: false
				}
			]
		}

		store.state.todos = falseState.todos
		const wrapper = mount(TodoRemaining, { store, localVue })
		expect(wrapper.find('div').text()).toContain('1 items left')
	})
})
