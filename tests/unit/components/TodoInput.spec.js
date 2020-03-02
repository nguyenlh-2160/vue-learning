import { mount, createLocalVue } from '@vue/test-utils'
import TodoInput from '@/components/TodoInput'
import Vuex from 'vuex'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test TodoInput.vue file', () => {
	let state
	let store

	beforeEach(() => {
		state = {
			todos: []
		}

		store = new Vuex.Store({
			state,
			actions,
			mutations
		})
	})

	it('test input', async () => {
		const expectedState = {
			todos: [
				{
					id: 0,
					title: 'test',
					completed: false,
					edit: false
				}
			]
		}
		const wrapper = mount(TodoInput, { store, localVue })
		expect(wrapper.find('input').text()).toContain('')
		wrapper.vm.newTodo = 'test'
		wrapper.find('input').trigger('keyup.enter')
		await flushPromises()
		expect(store.state.todos).toEqual(expectedState.todos)
	})

	it('test empty input', async () => {
		const expectedState = {
			todos: []
		}
		const wrapper = mount(TodoInput, { store, localVue })
		expect(wrapper.find('input').text()).toContain('')
		wrapper.vm.newTodo = ''
		wrapper.find('input').trigger('keyup.enter')
		await flushPromises()
		expect(store.state.todos).toEqual(expectedState.todos)
	})
})
