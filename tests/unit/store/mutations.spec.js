import * as mutations from '@/store/mutations'

describe('test mutations.js', () => {
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
			],
			filter: 'all',
			beforeEditTitle: ''
		}
	})

	it('test toggleCompletedAll mutations in case checkbox is checked', () => {
		const checked = true
		mutations.toggleCompletedAll(state, checked)
		expect(state.todos[0].completed).toEqual(true)
	})

	it('test toggleCompletedAll mutations in case checkbox is unchecked', () => {
		const checked = false
		mutations.toggleCompletedAll(state, checked)
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
		mutations.clearAllCompleted(state)
		expect(state.todos).toEqual(ExpectedState.todos)
	})

	it('test chooseFilter mutations', () => {
		const filter = 'active'
		mutations.chooseFilter(state, filter)
		expect(state.filter).toEqual(filter)
	})

	it('test chooseFilter mutations', () => {
		const filter = 'completed'
		mutations.chooseFilter(state, filter)
		expect(state.filter).toEqual(filter)
	})

	it('test chooseFilter mutations', () => {
		const filter = 'all'
		mutations.chooseFilter(state, filter)
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
		mutations.addTodo(state, todo)
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

		mutations.doneEdit(state, editTodo)
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

		mutations.removeTodo(state, index)
		expect(state.todos).toEqual(ExpectedState.todos)
	})
})
