import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import GoogleFontLoader from 'react-google-font-loader';
import { loadPosts, destroyPost, editingPost } from '../redux/actions/postsActions'

const Profile = () => {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const { email, username } = user;
  const [userMessages, setUserMessages] = useState([]);
  const dispatch = useDispatch()
  const [edit, setEdit] = useState("")
  const [msgEdit, setMsgEdit] = useState("")

  useEffect(() => {
    
    const fetchUserPosts = () => {
      fetch(`http://localhost:1337/posts?user.id=${user.id}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((response) => {
        dispatch(loadPosts(response))
        setUserMessages(response)
      })
      .catch((error) => {
        alert(error)
      })
    }
    
    fetchUserPosts()
  })

  const editPost = (message) => {
    const data = {
      text: msgEdit
    }
    fetch(`http://localhost:1337/posts/${message.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(editingPost(response))
        setEdit("")
      })
      .catch((error) => {
        alert(error)
      })
  }

  const deletePost = (toDeletePost) => {
    if (window.confirm("Le message va être supprimé")) {
      fetch(`http://localhost:1337/posts/${toDeletePost.id}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((response) => {
          dispatch(destroyPost(response))
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  return (
    <>
      <>
        <GoogleFontLoader
          fonts={[{ font: 'Roboto', weights: [400, '400i'],}, { font: 'Roboto Mono', weights: [1000, 700],},]}
          subsets={['cyrillic-ext', 'greek']}
        />
      </>
      <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> Ton profil </h1>
      <div style={{ margin: '80px' }}>
        <p>Prénom : {username}</p>
        <p>Mail: {email}</p>
      </div><br></br><br></br><br></br><br></br>
        <h2>Tes messages, {username}</h2>
        <ul>
          {userMessages.map((message) => {
            return (
              <li className="messages" key={message.id}>
                {edit !== message.id &&
                  <>
                    {message.text}
                  </>
                }<br></br>
                {edit === message.id &&
                  <>
                    <input value={msgEdit} onFocus={() => setMsgEdit(message.text)} autoFocus onChange={(e) => setMsgEdit(e.target.value)} />
                    <button onClick={() => editPost(message)}>Editer</button>
                    <button onClick={() => setEdit("")}>Annuler</button>
                  </>
                }
                { message.user.id === user.id && edit !== message.id &&
                  <>
                    <button onClick={() => deletePost(message)} >Supprimer</button>
                    <button onClick={() => setEdit(message.id)}>Editer</button>
                  </>
                }
              </li>
            )
          })}
        </ul>
    </>
  )
}
export default Profile;
