import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap'

const CommonNavbar = ({ username, isAuthenticated, onLogout }) => {
  const renderNavLink = () => {
    return isAuthenticated
      ? (
        <>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/todo">Home</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Text className="mr-3">
              Signed in as: <a href="">{username}</a>
            </Navbar.Text>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </>
      )
      : (
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
        </Nav>
      )
  }
  return (
    // Navigationを上部固定
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/todo">Todo App</Navbar.Brand>
      {renderNavLink()}
    </Navbar>
  )
}

export default CommonNavbar