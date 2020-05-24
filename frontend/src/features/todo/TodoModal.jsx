import React, { useState } from 'react'

import { Modal, Button } from 'react-bootstrap'

import TodoForm from './TodoForm'

const TodoModal = ({ onCrtTodo }) => {
  const [show, setShow] = useState(false)
  const toggleForm = () => setShow(!show)

  const onClose = () => {
    setShow(false)
  }

  const createTodo = (form) => {
    onCrtTodo(form)
    onClose()
  }

  return (
    <>
      <Button variant="primary" onClick={toggleForm}>Create Todo</Button>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoForm onClose={onClose} createTodo={createTodo} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TodoModal