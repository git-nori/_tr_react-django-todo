import client from '../utils/api'

// Todoを全件取得する
export function fetchTodos() {
  return client.get('/api/')
}

// Todoを作成する
export function createTodo(params){
  console.log(params)
  return client.post('/api/', params)
}

// Todoを更新する
export function editTodo(id, params){
  return client.put(`/api/${id}`, params)
}

// Todoを削除する
export function deleteTodo(id) {
  return client.delete(`/api/${id}`)
}