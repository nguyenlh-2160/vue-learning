import { mount, createLocalVue } from '@vue/test-utils'
import TodoItem from '@/components/TodoItem'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test TodoItem.vue file', () => {
	let store
	let state
	let actions
	let propsData

	beforeEach(() => {
		state = {
			todos: []
		}

		actions = {
			doneEdit: jest.fn(),
			removeTodo: jest.fn()
		}

		propsData = {
			todo: {
				id: 0,
				title: 'mutations test',
				completed: false,
				edit: false
			},
			isCheckAll: false
		}

		store = new Vuex.Store({
			state,
			actions
		})
	})

	it('test todo-item checkbox', () => {
		const wrapper = mount(TodoItem, {
			propsData,
			store,
			localVue
		})
		expect(wrapper.text()).toContain('mutations test')
		expect(wrapper.find('.remove-item').text()).toContain('×')
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBeFalsy()
		wrapper.find('input[type="checkbox"]').setChecked()
		wrapper.find('input[type="checkbox"]').trigger('change')
		expect(actions.doneEdit).toHaveBeenCalled()
	})

	it('test todo-item-edit with empty title', () => {
		const wrapper = mount(TodoItem, {
			propsData: {
				todo: {
					id: 0,
					title: 'mutations test',
					completed: false,
					edit: true
				},
				isCheckAll: false
			},
			store,
			localVue
		})

		expect(wrapper.find('input[type="text"]').text()).toContain('')
		wrapper.vm.title = ''
		wrapper.find('input[type="text"]').trigger('keyup.enter')
		wrapper.find('input[type="text"]').trigger('blur')
		expect(actions.doneEdit).not.toHaveBeenCalled()
	})

	it('test todo-item-edit with title', () => {
		const wrapper = mount(TodoItem, {
			propsData: {
				todo: {
					id: 0,
					title: 'mutations test',
					completed: false,
					edit: true
				},
				isCheckAll: false
			},
			store,
			localVue
		})

		expect(wrapper.find('input[type="text"]').text()).toContain('')
		wrapper.vm.title = 'new title'
		wrapper.find('input[type="text"]').trigger('keyup.enter')
		wrapper.find('input[type="text"]').trigger('blur')
		expect(actions.doneEdit).toHaveBeenCalled()
	})

	it('test remove-item', () => {
		const wrapper = mount(TodoItem, {
			propsData,
			store,
			localVue
		})
		wrapper.find('.remove-item').trigger('click')
		expect(actions.removeTodo).toHaveBeenCalled()
	})
})
