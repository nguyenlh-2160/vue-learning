import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as getters from '@/store/getters'
import TodoCheck from '@/components/TodoCheck'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test TodoCheck.vue file', () => {
	let store
	let actions
	let state

	beforeEach(() => {
		state = {
			todos: [
				{
					id: 0,
					title: 'mutations test',
					completed: false,
					edit: false
				},
				{
					id: 1,
					title: 'mutations test 1',
					completed: true,
					edit: false
				}
			]
		}

		actions = {
			toggleCompletedAll: jest.fn()
		}

		store = new Vuex.Store({
			getters,
			state,
			actions
		})
	})

	it('Check all check box unchecked by default and trigger event on changing check-state', async () => {
		const wrapper = mount(TodoCheck, { store, localVue })
		expect(wrapper.html()).toContain(
			'<input type="checkbox" class="todo-checkbox">Check all'
		)
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBeFalsy()
		wrapper.find('input[type="checkbox"]').setChecked()
		wrapper.find('input[type="checkbox"]').trigger('change')
		await wrapper.vm.$nextTick()
		expect(actions.toggleCompletedAll).toHaveBeenCalled()
	})

	it('Check all check box unchecked if todos array is empty', () => {
		store.state.todos = []
		const wrapper = mount(TodoCheck, { store, localVue })
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBeTruthy()
	})

	it('Check all check box checked if todos array has no active todo-item remaining', () => {
		store.state.todos[0].completed = true
		const wrapper = mount(TodoCheck, { store, localVue })
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBeTruthy()
	})
})
