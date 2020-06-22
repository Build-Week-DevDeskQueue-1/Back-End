import React from 'react';
import './App.css';

import axios from 'axios'
axios.defaults.withCredentials = true // !!!IMPORTANT!!!

function App() {
  const register = () => {
    axios.post('http://localhost:3003/auth/register', { // live url: https://dev-desk-backend.herokuapp.com/auth/register
      username: "example-username",
      password: "example-password", // this is where you put in the required properties
      is_student: true
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  const login = () => {
    axios.post('http://localhost:3003/auth/login', { // live url: https://dev-desk-backend.herokuapp.com/auth/login
      username: "example-username",
      password: "example-password"
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  const logout = () => {
    axios.post('http://localhost:3003/auth/logout') // live url: https://dev-desk-backend.herokuapp.com/auth/logout
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  const newTicket = () => {
    axios.post('http://localhost:3003/tickets', {
      title: "example title",
      description: "example description",
      tried: "example of whats been tried",
      category: "react express node blah blah blah" // live url: https://dev-desk-backend.herokuapp.com/tickets
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  const tickets = () => {
    axios.get('http://localhost:3003/tickets') // live url: https://dev-desk-backend.herokuapp.com/tickets
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={register}>Register</h1>
        <h1 onClick={login}>Login</h1>
        <h1 onClick={tickets}>Tickets</h1>
        <h1 onClick={newTicket}>New Ticket</h1>
        <h1 onClick={logout}>Logout</h1>
      </header>
    </div>
  );
}

export default App;
