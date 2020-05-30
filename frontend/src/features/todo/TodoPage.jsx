import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  thunkFetchTodos,
  thunkCreateTodo,
  thunkDeleteTask,
  thunkEditTodo
} from '../../features/todo/todoSlice'
import TodoList from './TodoList'

import TodoModal from './TodoModal'

import { Container, Row, Col, Alert } from 'react-bootstrap'

const TodoPage = () => {
  const dispatch = useDispatch()
  const { todos, isLoading, error } = useSelector(state => state.todo)

  const onCrtTodo = (createdTodo) => {
    dispatch(thunkCreateTodo(createdTodo))
  }

  const onStatusChng = (id, status) => {
    dispatch(thunkEditTodo(id, status))
  }

  const onDelTodo = (id) => {
    dispatch(thunkDeleteTask(id))
  }

  useEffect(() => {
    dispatch(thunkFetchTodos())
  }, [])

  const renderErr = () => {
    return error && (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    )
  }

  return isLoading
    ? (<div>...Loading</div>)
    : (
      <Container className={'mt-5'}>
        {renderErr()}
        <Row>
          <Col>
            <TodoModal onCrtTodo={onCrtTodo} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoList todos={todos} onDelTodo={onDelTodo} onStatusChng={onStatusChng} />
          </Col>
        </Row>
      </Container>
    )
}

export default TodoPage