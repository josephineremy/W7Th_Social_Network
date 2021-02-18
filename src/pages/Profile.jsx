import React from 'react';
import { useSelector } from 'react-redux'
import GoogleFontLoader from 'react-google-font-loader';

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const { email, username } = user;

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
      <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> Ton profil </h1>
      <div style={{ margin: '80px' }}>
        <p>Prénom : {username}</p>
        <p>Mail: {email}</p>
      </div>
    </>
  )
}
export default Profile;
