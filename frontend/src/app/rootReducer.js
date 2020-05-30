import { combineReducers } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import userReducer from '../features/auth/userSlice'
import globalMessageReducer from '../features/util/globalMessageSlice'

const rootReducer = combineReducers({
  todo: todoReducer,
  user: userReducer,
  globalMessage: globalMessageReducer
})

export default rootReducer