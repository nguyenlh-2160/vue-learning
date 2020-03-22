import { ActionTree, ActionContext } from 'vuex'
import { AppState, todo, RootState } from '~/types'

interface AppActionContext extends ActionContext<AppState, RootState> {}

export const actions: ActionTree<AppState, RootState> = {
  addTodo({ commit }: AppActionContext, payload: todo): void {
    commit('addTodo', payload)
  },
  toggleAllCompleted({ commit }: AppActionContext, payload: boolean): void {
    commit('toggleAllCompleted', payload)
  },
  chooseFilter({ commit }: AppActionContext, payload: string): void {
    commit('chooseFilter', payload)
  },
  doneEdit({ commit }: AppActionContext, payload: any): void {
    commit('doneEdit', payload)
  },
  removeTodo({ commit }: AppActionContext, payload: number): void {
    commit('removeTodo', payload)
  },
  clearAllCompleted({ commit }: AppActionContext): void {
    commit('clearAllCompleted')
  }
}

export default actions
