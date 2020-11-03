import * as getters from '@/store/getters'

describe('test getters.js', () => {
	let state
	const emptyState = {
		todos: []
	}

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
			filter: 'all'
		}
	})

	it('test remaining function', () => {
		expect(getters.remaining(state)).toEqual(1)
		expect(getters.remaining(emptyState)).toEqual(0)
	})

	it('test anyRemaining function', () => {
		expect(!!getters.remaining(state)).toBe(true)
		expect(!!getters.remaining(emptyState)).toBe(false)
	})

	it('test isRemaining function', () => {
		expect(getters.isRemaining(state)).toBe(true)
		expect(getters.isRemaining(emptyState)).toBe(false)
	})

	it('test todosFiltered function', () => {
		expect(getters.todosFiltered(emptyState)).toEqual([])
		expect(getters.todosFiltered(state)).toEqual(state.todos)
		const activeFilter = 'active'
		state.filter = activeFilter
		const activeState = {
			todos: [
				{
					id: 0,
					title: 'mutations test',
					completed: false,
					edit: false
				}
			]
		}
		expect(getters.todosFiltered(state)).toEqual(activeState.todos)
		const completedFilter = 'completed'
		state.filter = completedFilter
		const completedState = {
			todos: [
				{
					id: 1,
					title: 'mutations test 1',
					completed: true,
					edit: false
				}
			]
		}
		expect(getters.todosFiltered(state)).toEqual(completedState.todos)
	})
})
