import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { thunkLogin } from '../userSlice'

import LoginForm from './LoginForm'

import { Container, Row, Col, Card } from 'react-bootstrap'
import './LoginPage.css'

const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogin = (loginData) => {
    dispatch(thunkLogin(loginData, history))
  }

  return (
    <Container className="contaner">
      <Row>
        <Col className="offset-2 col-8">
          <Card border="secondary">
            <Card.Body>
              <Card.Title className="text-center">Login Page</Card.Title>
              <LoginForm onLogin={onLogin} />
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/signup" className="text-decoration-none">
                dont has an account? go to signup
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage