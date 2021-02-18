import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader';

import { loginSuccess, loginFail } from '../redux/actions/authActions'

const Login = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history])

  const login = (e) => {
    e.preventDefault()
    const data = {
      identifier: email,
      password: password
    }

    fetch("http://localhost:1337/auth/local/", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then((response) => response.json())
      .then((response) => {
        dispatch(loginSuccess(response))
        history.push("/");
      })
      .catch((error) => {
        dispatch(loginFail())
        alert("Mauvais email ou mot de passe")
      })
  }

  return (
    <>
     <>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Roboto',
          weights: [400, '400i'],
        },
        {
          font: 'Roboto Mono',
          weights: [1000, 700],
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
    />
    </>
    <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> Se connecter </h1>
      <div style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
          <div className="form-box">
            <form onSubmit={login}>
              <input className="input-register" type="text" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
              <input className="input-register" type="password" placeholder="Your unforgettable password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
              <input className="input-register btn-submit" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;