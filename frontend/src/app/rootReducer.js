import { combineReducers } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

const rootReducer = combineReducers({
  todo: todoReducer
})

export default rootReducer