import client from '../utils/api'

export function login(params) {
  return client.post('/api/auth/jwt/create/', params)
}

export function getUser(){
  return client.get('/api/auth/users/me/')
}