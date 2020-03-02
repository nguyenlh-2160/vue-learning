import { mount, createLocalVue } from '@vue/test-utils'
import TodoFilter from '@/components/TodoFilter'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test todoFilter.vue file', () => {
	let store
	let actions
	let filter_type

	beforeEach(() => {
		filter_type = [{ type: 'all' }, { type: 'active' }, { type: 'completed' }]

		actions = {
			chooseFilter: jest.fn()
		}

		store = new Vuex.Store({
			actions
		})
	})

	it('Choose filter has been called', () => {
		const wrapper = mount(TodoFilter, {
			propsData: {
				filter_type
			},
			store,
			localVue
		})
		expect(wrapper.text()).toContain('all')
		expect(wrapper.text()).toContain('active')
		expect(wrapper.text()).toContain('completed')
		wrapper.find('button').trigger('click')
		expect(actions.chooseFilter).toHaveBeenCalled()
	})
})
