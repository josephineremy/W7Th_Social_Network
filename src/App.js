import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'
import { Layout } from 'antd';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OtherUser from './pages/OtherUser';

import "./App.css"

import { loadUser } from './redux/actions/authActions'

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('token')) {
      fetch("http://localhost:1337/users/me", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(loadUser(response))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dispatch])

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    )} />
  )

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Router basename={process.env.PUBLIC_URL}>
        <Navbar />
        <Layout>
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/user/:userId" component={OtherUser} />
            <Route exact path="/" component={Home} />
          </Switch>
         </Layout>
      </Router >
    </Layout>

  )
}

export default App;