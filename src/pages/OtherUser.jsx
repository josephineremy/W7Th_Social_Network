import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import GoogleFontLoader from 'react-google-font-loader';


const OtherUser = () => {
  const token = useSelector(state => state.auth.token);
  const [user, setUser] = useState({})
  const [userMessages, setUserMessages] = useState([])
  let { userId } = useParams()

  useEffect(() => {

    const fetchUser = () => {
      fetch(`http://localhost:1337/users/${userId}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((response) => {
        setUser(response)
      })
      .catch((error) => {
        alert(error)
      })
    }
    
    const fetchUserPosts = () => {
      fetch(`http://localhost:1337/posts?user.id=${userId}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((response) => {
        setUserMessages(response)
      })
      .catch((error) => {
        alert(error)
      })
    }
    
    fetchUser()
    fetchUserPosts()
  }, [token, userId])

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
      <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> {user.username} </h1>
      <div style={{ margin: '80px' }}>
        <div>
          <p>Prénom : {user.username}</p>
          <p>Email : {user.email}</p>
        </div><br></br><br></br><br></br><br></br>
        <h2>Les messages postés par {user.username}</h2>
        <ul>
          {userMessages.map((message) => {
            return (
              <li className="messages" key={message.id}>
                <b>{message.user.username} : </b>
                  {message.text}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default OtherUser
