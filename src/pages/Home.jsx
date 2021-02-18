import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import GoogleFontLoader from 'react-google-font-loader';
import { Divider } from 'antd';

import { loadPosts, newPost, destroyPost, editingPost } from '../redux/actions/postsActions'

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);

  const [msg, setMsg] = useState("")
  const [msgEdit, setMsgEdit] = useState("")
  const [edit, setEdit] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    const getPosts = () => {
      fetch("http://localhost:1337/posts")
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then((response) => {
          dispatch(loadPosts(response))
        })
    }
    if (posts.length === 0) {
      getPosts()
    }
  }, [posts, dispatch])

  const addPost = (e) => {
    e.preventDefault()
    const addPost = {
      text: msg,
      user: user.id
    }
    fetch("http://localhost:1337/posts", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(addPost)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then((response) => response.json())
      .then((response) => {
        dispatch(newPost(response))
        setMsg('')
      })
      .catch((error) => {
        alert(error)
      })
  }

  const editPost = (post) => {
    const data = {
      text: msgEdit
    }
    fetch(`http://localhost:1337/posts/${post.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
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
      <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> Bienvenue sur le réseau social </h1>
      <div style={{ margin: "80px" }}>
          {isAuthenticated &&
            <>
              <div className="form-box">
                <form onSubmit={addPost} className="msg-box">
                  <textarea className="input-message" type="text" placeholder="Ton message..." onChange={(e) => setMsg(e.target.value)} value={msg} /><br></br>
                  <input type="submit" className="btn-submit" />
                </form><br></br><br></br><br></br>
              </div>   
            </>
          }
          <div>
          <Divider>Les messages laissés</Divider>
            <ul>
              {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
                if (!post.text || !post.user) {
                  return false
                }
                return (

                  <li key={post.id} className="messages">
                    {isAuthenticated &&
                      <Link style={{ fontFamily: 'Roboto Mono, monospaced' }} to={`/user/${post.user.id}`}>
                        <b>{post.user.username} : </b>
                      </Link>
                    }
                    {edit !== post.id &&
                      <>
                        {post.text}
                      </>
                    }<br></br><br></br>
                    {edit === post.id &&
                      <>
                        <input value={msgEdit} onFocus={() => setMsgEdit(post.text)} autoFocus onChange={(e) => setMsgEdit(e.target.value)} />
                        <button onClick={() => editPost(post)}>Editer</button>
                        <button onClick={() => setEdit("")}>Annuler</button>
                      </>
                    }
                    {isAuthenticated && post.user.id === user.id && edit !== post.id &&
                      <>
                        <button onClick={() => deletePost(post)} >Supprimer</button>
                        <button onClick={() => setEdit(post.id)}>Editer</button>
                      </>
                    }
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
    </>
  )
}

export default Home;
