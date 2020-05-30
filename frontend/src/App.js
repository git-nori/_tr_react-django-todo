import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { thunkFetchUser, thunkLogout } from './features/auth/userSlice'

import AuthRoute from './components/AuthRoute'
import LoginPage from './features/auth/login/LoginPage'
import SignupPage from './features/auth/signup/SignupPage'
import TodoPage from './features/todo/TodoPage'
import CommonNavbar from './components/CommonNavbar'

function App () {
  const dispatch = useDispatch()
  const { username, isLoggedIn } = useSelector(state => state.user)
  const token = localStorage.getItem('access')

  useEffect(() => {
    if (isLoggedIn) {
      if (token) {
        // トークンが残っている場合
        dispatch(thunkFetchUser())
      }
    }
  }, [])

  const onLogout = () => {
    dispatch(thunkLogout())
  }

  return (
    <Router>
      <CommonNavbar username={username} isAuthenticated={isLoggedIn} onLogout={onLogout} />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <AuthRoute exact path="/todo" isAuthenticated={isLoggedIn} redirectPath={"/login"} component={TodoPage} />
      </Switch>
    </Router>
  );
}

export default App;
