import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { newPost } from '../redux/actions/postsActions';

const NewPost = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [msg, setMsg] = useState("")
  const dispatch = useDispatch()

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
        .then((response) => response.json())
        .then((response) => {
          dispatch(newPost(response))
          setMsg('')
        })
        .catch((error) => {
          alert(error)
        })
    }

  return (
    <>
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
      </>
  )    

}
export default NewPost