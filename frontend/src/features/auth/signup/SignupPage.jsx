import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSignup } from '../userSlice'

import SignupForm from './SignupForm'

import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import './SignupPage.css'

const SignupPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isShowAlert, setIsShowAlert] = useState(false)
  const message = useSelector(state => state.globalMessage)

  const onSignup = (signupData) => {
    dispatch(thunkSignup(signupData, history))
  }

  useEffect(() => {
    if(message.error > 0){
      setIsShowAlert(true)
    }
  }, [message.error])

  const renderError = () => {
    return isShowAlert && (
      <Alert variant="danger" onClose={() => setIsShowAlert(false)} dismissible>
        {message.error}
      </Alert>
    )
  }

  return (
    <Container className="contaner">
      <Row>
        <Col className="offset-2 col-8">
          {renderError()}
        </Col>
      </Row>
      <Row>
        <Col className="offset-2 col-8">
          <Card border="secondary">
            <Card.Body>
              <Card.Title className="text-center">Signup Page</Card.Title>
              <SignupForm warnings={message.warnings} onSignup={onSignup} />
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/login" className="text-decoration-none">
                has an account? go to login
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage