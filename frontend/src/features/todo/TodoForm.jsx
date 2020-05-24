import React, { useState } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Form, Button } from 'react-bootstrap'
import './TodoForm.css'

const TodoForm = ({ onClose, createTodo }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required').max(10, 'max length 10'),
    description: Yup.string().required('Required'),
    status: Yup.string().matches("Unstarted|In Progress|Completed", 'Required Unstarted or In Progress or Completed'),
  })
  return (
    <Formik
      initialValues={{ title: "", description: "", status: "" }}
      validationSchema={validationSchema}
      onSubmit={values => {
        values.status === "" && delete values.status
        createTodo(values)
      }}
      render={({
        touched,
        values,
        errors,
        isValid,
        handleChange,
        handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                value={values.title}
                isValid={touched.title && !errors.title}
                isInvalid={errors.title && touched.title}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={values.description}
                isValid={touched.description && !errors.description}
                isInvalid={errors.description && touched.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>status</Form.Label>
              <Form.Control
                as="select"
                value={values.status}
                isValid={touched.status && !errors.status}
                isInvalid={errors.status && touched.status}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="Unstarted">Unstarted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
            <div className="form-btn">
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </div>
          </Form>
        )}
    />
  )
}

export default TodoForm