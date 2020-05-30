import todoSlice, {
  setLoading,
  setError,
  setTodos,
  createTodo,
  editTodo,
  deleteTodo,
  thunkCreateTodo,
  thunkDeleteTask,
  thunkEditTodo,
  thunkFetchTodos
} from './todoSlice'

import axios from 'axios'
import thunk from 'redux-thunk'
import createMockStore from 'redux-mock-store'

// axiosをmock化
jest.mock('./__mocks__/axios')

// mockするstoreのセット
const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

describe('todoSlice', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });  
  // prepareなどの処理を挟む場合もあるためテストは必要
  // https://redux-toolkit.js.org/tutorials/intermediate-tutorial#updating-the-todos-tests
  describe('actions', () => {
    it('setLoading', () => {
      const action = setLoading(true)

      expect(action).toStrictEqual({
        type: 'todo/setLoading',
        payload: true
      })
    })

    it('setError', () => {
      const action = setError('error')

      expect(action).toStrictEqual({
        type: 'todo/setError',
        payload: 'error'
      })
    })

    it('setTodos', () => {
      const todos = [
        {
          id: 1,
          title: 'title1',
          description: 'description1',
          status: 'Unstarted'
        },
        {
          id: 2,
          title: 'title2',
          description: 'description2',
          status: 'Unstarted'
        },
        {
          id: 3,
          title: 'title3',
          description: 'description3',
          status: 'Completed'
        },
      ]
      const action = setTodos(todos)

      expect(action).toStrictEqual({
        type: 'todo/setTodos',
        payload: todos
      })
    })

    it('createTodo', () => {
      const todo = {
        id: 1,
        title: 'title1',
        description: 'description1',
        status: 'Unstarted'
      }
      const action = createTodo(todo)

      expect(action).toStrictEqual({
        type: 'todo/createTodo',
        payload: todo
      })
    })

    it('editTodo', () => {
      const todo = {
        id: 1,
        title: 'title1',
        description: 'description1',
        status: 'Unstarted'
      }
      const action = editTodo(todo)
      expect(action).toStrictEqual({
        type: 'todo/editTodo',
        payload: todo
      })
    })

    it('deleteTodo', () => {
      const id = 1
      const action = deleteTodo(id)
      expect(action).toStrictEqual({
        type: 'todo/deleteTodo',
        payload: id
      })
    })

    it('thunkFetchTodos', async () => {
      const expectedResults = [
        {
          title: 'title1',
          description: 'description1',
          status: 'Unstarted'
        },
        {
          title: 'title2',
          description: 'description2',
          status: 'Completed'
        },
        {
          title: 'title3',
          description: 'description3',
          status: 'It Started'
        },
      ]
      // mock化したaxiosの戻り値を設定
      axios.get.mockResolvedValue({
        data: expectedResults
      })

      // storeのMockを作成
      const store = mockStore()
      await store.dispatch(thunkFetchTodos())

      expect(store.getActions()).toEqual([
        {
          type: 'todo/setLoading',
          payload: true
        },
        {
          type: 'todo/setTodos',
          payload: expectedResults
        },
        {
          type: 'todo/setLoading',
          payload: false
        }
      ])
    })
  })
})
