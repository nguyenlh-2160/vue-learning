import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TodoClear from '@/components/TodoClear'
import flushPromises from 'flush-promises'
import * as getters from '@/store/getters'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Actions.vue', () => {
	let state
	let store

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

		store = new Vuex.Store({
			getters,
			state,
			actions,
			mutations
		})
	})

	it('show clearAllCompleted if app has at least one completed Todo', () => {
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
		const wrapper = mount(TodoClear, { store, localVue })
		expect(store.getters.isRemaining).toBeTruthy()
		expect(wrapper.find('button').text()).toContain('Clear completed')
	})

	it('remove clearAllCompleted if app doesnt have completed Todo', () => {
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
		const wrapper = mount(TodoClear, { store, localVue })
		expect(store.getters.isRemaining).toBeFalsy()
		expect(wrapper.html()).toContain('<!---->')
	})

	it('calls store actions clearAllCompleted on a click', async () => {
		const ExpectedState = {
			todos: [
				{
					id: 0,
					title: 'mutations test',
					completed: false,
					edit: false
				}
			]
		}

		const wrapper = mount(TodoClear, { store, localVue })
		expect(store.getters.isRemaining).toBeTruthy()
		wrapper.find('button').trigger('click')
		await flushPromises()
		expect(store.state.todos).toEqual(ExpectedState.todos)
	})
})
