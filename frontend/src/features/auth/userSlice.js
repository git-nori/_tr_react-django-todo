import { createSlice } from '@reduxjs/toolkit'

import * as api from '../../api/user'

const initialState = {
  username: '',
  isLoggedIn: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      state.username = action.payload.username
      state.isLoggedIn = true
    },
    clearUser (state) {
      state.username = ''
      state.isLoggedIn = true
    }
  }
})

export const {
  setUser,
  clearUser
} = userSlice.actions

export default userSlice.reducer

// thunk
// login
export const thunkLogin = ({ username, password }) => dispatch => {
  api.login({ username, password })
    .then(res => {
      // tokenをlocalStorageに追加
      localStorage.setItem('access', res.data.access)
    })
}

// fetchUserData
export const thunkFetchUser = () => dispatch => {
  api.getUser()
    .then(res => {
      dispatch(setUser(res.data))
    })
}

// logout
export const thunkLogout = () => dispatch => {
  // tokenをlocalStorageから削除
  localStorage.removeItem('access')
  dispatch(clearUser())
}