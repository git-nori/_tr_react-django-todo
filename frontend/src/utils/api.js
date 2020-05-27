import axios from 'axios'
import store from '../app/store'
import { clear, thunkSetWarnMsg, thunkSetErrMsg } from '../features/util/globalMessageSlice'
import { thunkLogout } from '../features/auth/userSlice'

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-With': 'XMLHttpRequest'
  },
});

// 共通前処理
api.interceptors.request.use((config) => {
  // メッセージクリア
  store.dispatch(clear())
  const token = localStorage.getItem('access')
  if (token) {
    // ヘッダーにauthorizationをセット
    config.headers.Authorization = `JWT ${token}`
    return config
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 共通エラー処理
api.interceptors.response.use((res) => {
  return res
}, (error) => {
  console.log('error.response=', error.response)
  const status = error.response ? error.response.status : 500

  let msg
  switch (status) {
    case 400:
      // バリデーションエラー
      msg = Object.values(error.response.data)
      store.dispatch(thunkSetWarnMsg(msg))
      break;
    case 401:
      // 認証エラー
      const token = localStorage.getItem('access')
      if (token) {
        // 認証エラーの場合
        msg = '認証エラー'
      } else {
        // 期限切れの場合
        msg = 'ログイン有効期限切れ'
      }
      store.dispatch(thunkLogout())
      store.dispatch(thunkSetErrMsg(msg))
      break;
    case 403:
      // 権限エラー
      msg = '権限エラーです'
      store.dispatch(thunkSetWarnMsg(msg))
      break;
    default:
      msg = '想定外のエラーです'
      store.dispatch(thunkSetWarnMsg(msg))
      break;
  }
  return Promise.reject(error)
})

export default api