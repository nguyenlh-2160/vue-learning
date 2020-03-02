import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test actions.js file', () => {
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
			],
			filter: 'all',
			beforeEditTitle: ''
		}

		store = new Vuex.Store({
			state,
			mutations,
			actions
		})
	})

	it('test toggleCompletedAll mutations in case checkbox is checked', () => {
		const checked = true
		store.dispatch('toggleCompletedAll', checked)
		expect(state.todos[0].completed).toEqual(true)
	})

	it('test toggleCompletedAll mutations in case checkbox is unchecked', () => {
		const checked = false
		store.dispatch('toggleCompletedAll', checked)
		expect(state.todos[0].completed).toEqual(false)
	})

	it('test clearAllCompleted mutations', () => {
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
		store.dispatch('clearAllCompleted')
		expect(state.todos).toEqual(ExpectedState.todos)
	})

	it('test chooseFilter mutations', () => {
		const filter = 'active'
		store.dispatch('chooseFilter', filter)
		expect(state.filter).toEqual(filter)
	})

	it('test chooseFilter mutations', () => {
		const filter = 'completed'
		store.dispatch('chooseFilter', filter)
		expect(state.filter).toEqual(filter)
	})

	it('test chooseFilter mutations', () => {
		const filter = 'all'
		store.dispatch('chooseFilter', filter)
		expect(state.filter).toEqual(filter)
	})

	it('test chooseFilter mutations', () => {
		expect(state.filter).toEqual('all')
	})

	it('test addTodo mutations', () => {
		const todo = {
			idForTodo: 2,
			newTodo: 'addTodo function test'
		}

		const ExpectedState = {
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
				},
				{
					id: 2,
					title: 'addTodo function test',
					completed: false,
					edit: false
				}
			]
		}
		store.dispatch('addTodo', todo)
		expect(state.todos).toEqual(ExpectedState.todos)
	})

	it('test doneEdit mutations', () => {
		const editTodo = {
			index: 0,
			id: 0,
			title: 'edit mutations test',
			completed: true,
			edit: false,
			beforeEditTitle: ''
		}

		const ExpectedState = {
			todos: [
				{
					id: 0,
					title: 'edit mutations test',
					completed: true,
					edit: false,
					beforeEditTitle: ''
				},
				{
					id: 1,
					title: 'mutations test 1',
					completed: true,
					edit: false
				}
			]
		}

		store.dispatch('doneEdit', editTodo)
		expect(state.todos).toEqual(ExpectedState.todos)
	})

	it('test removeTodo mutations', () => {
		const index = 0

		const ExpectedState = {
			todos: [
				{
					id: 1,
					title: 'mutations test 1',
					completed: true,
					edit: false
				}
			]
		}
		store.dispatch('removeTodo', index)
		expect(state.todos).toEqual(ExpectedState.todos)
	})
})
