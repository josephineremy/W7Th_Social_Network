import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import GoogleFontLoader from 'react-google-font-loader';
import { Divider } from 'antd';

const OtherUser = () => {
    const token = useSelector(state => state.auth.token);
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    let { userId } = useParams()

    useEffect(() => {
        const fetchUser = () => {
            fetch(`http://localhost:1337/users/${userId}`, {
                method: 'get',
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
                    setUserPosts(response)
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
                    <Divider>Les messages postés par {user.username}</Divider>
                    <ul>
                        {userPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
                            if (!post.text || !post.user) {
                                return false
                            }
                            return (
                                <li className="messages" key={post.id}>

                                    <b>{post.user.username} : </b>

                                    {post.text}
                                </li>)
                        })}
                    </ul>
                </div>
        </>
        )
}

export default OtherUser
