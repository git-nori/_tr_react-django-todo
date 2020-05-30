import React from 'react'

import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Button, Alert } from 'react-bootstrap'

const SignupForm = ({ warnings, onSignup }) => {
  const renderWarnings = () => {
    return warnings.length > 0 && (
      <Alert variant="danger">
        {warnings}
      </Alert>
    )
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required').min(4, 'min length 4').max(10, 'max length 10'),
    password: Yup.string().required('Required').min(4, 'min length 4').max(10, 'max length 10'),
  })
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={values => {
        onSignup(values)
      }}
      render={({
        touched,
        values,
        errors,
        isValid,
        handleChange,
        handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {renderWarnings()}
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
                Signup
              </Button>
            </div>
          </Form>
        )}
    />
  )
}

export default SignupForm