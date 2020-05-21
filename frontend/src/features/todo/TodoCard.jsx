import React from 'react'

import { Card, Button, Form } from 'react-bootstrap';

import './TodoCard.css'

const TodoCard = ({
  todo: {
    id,
    title,
    description,
    status,
    deleteTask,
    changeStatus
  },
  slbList
}) => {
  const renderOptionList = () => {
    return slbList.map((slb, idx) => (
      <option key={idx} value={slb.status}>{slb.status}</option>
    ))
  }

  const hdlChngStatus = () => {
    changeStatus(id, status)
  }

  const hdlDelBtn = () => {
    deleteTask(id)
  }

  return (
    <div>
      <Card className="card-layout">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
      <Form inline>
        <Form.Control as="select" onChange={hdlChngStatus}>
          {renderOptionList()}
        </Form.Control>
        <div className="btn-layout">
          <Button variant="danger" size="sm" onClick={hdlDelBtn}>Delete Task</Button>
        </div>
      </Form>
    </div>
  )
}

export default TodoCard