import React from 'react'

import TodoCard from './TodoCard'

import './TodoList.css'
import { Row, Col } from 'react-bootstrap'

const TodoList = ({ todos }) => {
  const statusTypes = [
    { status: 'Unstarted' },
    { status: 'In Progress' },
    { status: 'Completed' },
  ]

  const renderList = (todos, types) => {
    return todos
      .filter(todo => todo.status === types)
      .map(todo => {
        const slbList = statusTypes.filter(statusType => statusType.status !== types)
        return (
          <TodoCard key={todo.id} todo={todo} slbList={slbList} />
        )
      })
  }

  return (
    <>
      <div className='card-block'>
        <Row>
          <Col><h2>Unstarted</h2></Col>
        </Row>
        <Row>
          <Col className='card-layout'>{renderList(todos, statusTypes[0].status)}</Col>
        </Row>
      </div>
      <div className='card-block'>
        <Row>
          <Col><h2>In Progress</h2></Col>
        </Row>
        <Row>
          <Col className='card-layout'>{renderList(todos, statusTypes[1].status)}</Col>
        </Row>
      </div>
      <div className='card-block'>
        <Row>
          <Col><h2>Completed</h2></Col>
        </Row>
        <Row>
          <Col className='card-layout'>{renderList(todos, statusTypes[2].status)}</Col>
        </Row>
      </div>
    </>
  )
}

export default TodoList