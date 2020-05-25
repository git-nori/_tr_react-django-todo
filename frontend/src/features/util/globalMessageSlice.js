import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: '',
  warnings: [],
  info: ''
}

const globalMessageSlice = createSlice({
  name: 'globalMessage',
  initialState,
  reducers: {
    set (state, action) {
      const { error, warnings, info } = action.payload
      if (error) { state.error = error }
      if (warnings) { state.warnings = warnings }
      if (info) { state.info = info }
    },
    clear (state) {
      state.error = ''
      state.warnings = []
      state.info = ''
    },
  },
})

export const {
  set,
  clear
} = globalMessageSlice.actions

export default globalMessageSlice.reducer

// thunk action
/** ErrorメッセージをStoreにセットする */
export const thunkSetErrMsg = (msg) => dispatch => {
  dispatch(clear())
  dispatch(set({ 'error': msg }))
}

/** InfoメッセージをStoreにセットする */
export const thunkSetInfoMsg = (msg) => dispatch => {
  dispatch(clear())
  dispatch(set({ 'info': msg }))
}

/** WarningsメッセージをStoreにセットする */
export const thunkSetWarnMsg = (msg) => dispatch => {
  dispatch(clear())
  dispatch(set({ 'warnings': msg }))
}