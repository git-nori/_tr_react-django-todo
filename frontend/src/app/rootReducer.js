import { combineReducers } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import globalMessageReducer from '../features/util/globalMessageSlice'

const rootReducer = combineReducers({
  todo: todoReducer,
  globalMessage: globalMessageReducer
})

export default rootReducer