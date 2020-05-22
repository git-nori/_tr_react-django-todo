import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

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