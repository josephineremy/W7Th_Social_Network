import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader';

import { registerSuccess, registerFail } from '../redux/actions/authActions'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  const registration = (e) => {
    e.preventDefault()
    const data = {
      username: name,
      email: email,
      password: password
    }

    fetch("http://localhost:1337/auth/local/register", {
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
        dispatch(registerSuccess(response))
        history.push("/");
      })
      .catch((error) => {
        dispatch(registerFail())
        alert(error)
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
     <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> S'inscrire </h1>
      <div style={{ margin: '80px' }}>
            <form onSubmit={registration}>
              <input className="input-register" type="text" placeholder="Prénom" value={name} onChange={(e) => setName(e.target.value)} required /><br></br>
              <input className="input-register" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
              <input className="input-register" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
              <input className="input-register btn-submit" type="submit" />
            </form>
      </div>
    </>
  )
}

export default Register;