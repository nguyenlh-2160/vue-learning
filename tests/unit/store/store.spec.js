import { store } from '@/store/store'

describe('test file store.js', () => {
	it('test state defined', () => {
		expect(store.state).toBeDefined
		expect(
			store.state[('strict', 'todos', 'state', 'filter', 'beforeEditTitle')]
		).toBeDefined
	})

	it('test strict', () => {
		expect(store.state.strict).toBe(true)
	})

	it('test getters defined', () => {
		expect(store.getters).toBeDefined
		expect(
			store.getters[
				('remaining', 'anyRemaining', 'isRemaining', 'todosFiltered')
			]
		).toBeDefined
	})

	it('test mutations defined', () => {
		expect(store._mutations).toBeDefined
		expect(
			store._mutations[
				('toggleAllCompleted',
				'clearAllCompleted',
				'chooseFilter',
				'addTodo',
				'doneEdit',
				'removeTodo')
			]
		).toBeDefined
	})

	it('test actions defined', () => {
		expect(store._actions).toBeDefined
		expect(
			store._actions[
				('toggleAllCompleted',
				'clearAllCompleted',
				'chooseFilter',
				'addTodo',
				'doneEdit',
				'removeTodo')
			]
		).toBeDefined
	})
})
