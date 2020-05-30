import React from 'react'

import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required').min(4, 'min length 4').max(10, 'max length 10'),
    password: Yup.string().required('Required').min(4, 'min length 4').max(10, 'max length 10'),
  })
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={values => {
        onLogin(values)
      }}
      render={({
        touched,
        values,
        errors,
        isValid,
        handleChange,
        handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                value={values.username}
                isValid={touched.username && !errors.username}
                isInvalid={errors.username && touched.username}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={errors.password && touched.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        )}
    />
  )
}

export default LoginForm