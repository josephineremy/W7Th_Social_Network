import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts, destroyPost, editingPost } from '../redux/actions/postsActions'


const DisplayPosts = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);
  const [msgEdit, setMsgEdit] = useState("")
  const [edit, setEdit] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    const getPosts = () => {
      fetch("http://localhost:1337/posts")
      .then((response) => response.json())
      .then((response) => {
        dispatch(loadPosts(response))
      })
    }
    if (posts.length === 0) {
      getPosts()
    }
  }, [posts, dispatch])

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
          <div>
          <h2>Les messages laissés</h2>
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
    </>
  )
}

export default DisplayPosts