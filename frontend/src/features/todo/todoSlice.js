import { createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'

const initialState = {
  todos: [],
  isLoading: false,
  error: null
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading (state, action) {
      state.isLoading = action.payload
    },
    setError (state, action) {
      state.error = action.payload
    },
    setTodos (state, action) {
      state.todos = action.payload.todos
    },
    createTodo (state, action) {
      state.todos.push(action.payload)
    },
    editTodo (state, action) {
      const newTodo = action.payload.todo
      state.todos = state.todos.map(todo => {
        if (todo.id === newTodo.id) {
          // 更新対象のタスクの場合
          return newTodo
        }
        return todo
      })
    },
    deleteTodo (state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    }
  }
})

export const {
  setLoading,
  setError,
  setTodos,
  createTodo,
  editTodo,
  editTodo
} = todoSlice.actions

export default todoSlice.reducer

// thunk action
// todoの全件取得
export const thunkFetchTodos = () => (dispatch) => {
  dispatch(setLoading(true))

  api.fetchTodos()
    .then(res => {
      dispatch(setTodos(res.data))
      dispatch(setLoading(false))
    })
    .catch(err => {
      dispatch(setError(err.message))
      dispatch(setLoading(false))
    })
}

// todoの新規作成
export const thunkCreateTodo = ({ title, description, status = 'Unstarted' }) => (dispatch) => {
  api.createTodo({ title, description, status })
    .then(res => {
      dispatch(createTodo(res.data))
    })
}

// todoの更新
export const thunkEditTodo = (id, params = {}) => (dispatch, getState) => {
  const todo = getState().todos.todos.find(task => task.id === id)
  const updatedTask = Object.assign({}, todo, params)
  api.editTodo(id, updatedTask)
    .then(res => {
      dispatch(editTodo(res.data))
    })
}

// todoの1件削除
export const thunkDeleteTask = (id) => (dispatch) => {
  api.deleteTodo(id)
    .then(res => {
      console.log(res)
      dispatch(deleteTodo(id))
    })
}