import globalMessageReducer, {
  set,
  clear,
  thunkSetErrMsg,
  thunkSetInfoMsg,
  thunkSetWarnMsg
} from './globalMessageSlice'

import thunk from 'redux-thunk'
import createMockStore from 'redux-mock-store'

// mockするstoreのセット
const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

describe('globalMessageSlice', () => {
  describe('actions', () => {
    it('set', () => {
      const expectedValue = {
        error: 'dummy error',
        warnings: ['dummy warnings1', 'dummy warnings2'],
        info: 'dummy info'
      }
      const action = set(expectedValue)

      expect(action).toStrictEqual({ type: 'globalMessage/set', payload: expectedValue })
    })

    it('clear', () => {
      const action = clear()

      expect(action).toStrictEqual({ type: 'globalMessage/clear', payload: undefined })
    })

    it('thunkSetErrMsg', () => {
      const expectedValue = 'dummy error'
      const action = thunkSetErrMsg(expectedValue)

      // storeをmock化
      const store = mockStore()
      store.dispatch(action)

      expect(store.getActions()).toStrictEqual([
        {
          type: 'globalMessage/clear',
          payload: undefined
        },
        {
          type: 'globalMessage/set',
          payload: { error: expectedValue }
        }
      ])
    })

    it('thunkSetInfoMsg', () => {
      const expectedValue = 'dummy info'
      const action = thunkSetInfoMsg(expectedValue)

      const store = mockStore()
      store.dispatch(action)

      expect(store.getActions()).toStrictEqual([
        {
          type: 'globalMessage/clear',
          payload: undefined
        },
        {
          type: 'globalMessage/set',
          payload: { info: expectedValue }
        }
      ])
    })

    it('thunkSetWarnMsg', () => {
      const expectedValue = ['dummy warning1', 'dummy warning2']
      const action = thunkSetWarnMsg(expectedValue)

      const store = mockStore()
      store.dispatch(action)

      expect(store.getActions()).toStrictEqual([
        {
          type: 'globalMessage/clear',
          payload: undefined
        },
        {
          type: 'globalMessage/set',
          payload: { warnings: expectedValue }
        }
      ])
    })
  })

  describe('reducers', () => {
    const createInitialState = () => {
      const action = {}
      const state = globalMessageReducer(undefined, action)
      return state
    }

    it('test initialState', () => {
      const state = createInitialState()
      expect(state).toStrictEqual({
        error: '',
        warnings: [],
        info: ''
      })
    })

    it('set all fields', () => {
      const expectedValue = {
        error: 'dummy error',
        warnings: ['dummy warnings1', 'dummy warnings2'],
        info: 'dummy info'
      }
      const action = set(expectedValue)
      const state = createInitialState()
      const newState = globalMessageReducer(state, action)

      expect(newState).toStrictEqual(expectedValue)
    })

    it('set one fields', () => {
      let expectedValue
      let state
      let action
      let newState

      // test error propertie
      expectedValue = 'dummy error'
      action = set({ error: expectedValue })
      state = createInitialState()
      newState = globalMessageReducer(state, action)

      expect(newState).toStrictEqual({
        error: expectedValue,
        warnings: state.warnings,
        info: state.info
      })

      // test warnings propertie
      expectedValue = ['dummy warnings1', 'dummy warnings2']
      action = set({ warnings: expectedValue })
      state = createInitialState()
      newState = globalMessageReducer(state, action)

      expect(newState).toStrictEqual({
        error: state.error,
        warnings: expectedValue,
        info: state.info
      })

      // test info propertie
      expectedValue = 'dummy info'
      action = set({ info: expectedValue })
      state = createInitialState()
      newState = globalMessageReducer(state, action)

      expect(newState).toStrictEqual({
        error: state.error,
        warnings: state.warnings,
        info: expectedValue
      })
    })

    it('clear', () => {
      const action = clear()
      const initialState = {
        error: 'dummy error',
        warnings: ['dummy warnings1', 'dummy warnings2'],
        info: 'dummy info'
      }
      const state = globalMessageReducer(initialState, {})
      const newState = globalMessageReducer(state, action)

      expect(newState).toStrictEqual({
        error: '',
        warnings: [],
        info: ''
      })
    })
  })
})