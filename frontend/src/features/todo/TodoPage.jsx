import React from 'react'

import TodoList from './TodoList'

import { Container, Row, Col, Button } from 'react-bootstrap'

const todos = [
  {
    "id": 1,
    "title": "Reduxのお勉強",
    "description": "特に非同期actionについて",
    "status": "In Progress"
  },
  {
    "id": 2,
    "title": "ES6のお勉強",
    "description": "Promiseについて",
    "status": "In Progress"
  },
  {
    "id": 3,
    "title": "朝食",
    "description": "忘れずに食べること",
    "status": "Completed"
  },
  {
    "title": "掃除",
    "description": "要らない本は捨てる",
    "status": "In Progress",
    "id": 4
  },
  {
    "title": "草刈り",
    "description": "夏草に要注意！",
    "status": "Unstarted",
    "id": 5
  }
]

const TodoPage = () => {
  const hdlCrtTodo = () => {
    
  }

  return (
    <Container className={'mt-5'}>
      <Row>
        <Col>
          <Button variant="primary" onClick={hdlCrtTodo}>Create Todo</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <TodoList todos={todos} />
        </Col>
      </Row>
    </Container>
  )
}

export default TodoPage