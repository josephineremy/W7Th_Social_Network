import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NewPost from '../components/NewPost'
import DisplayPosts from '../components/DisplayPosts'

const Home = () => {


  return (
    <>
      <>
        <GoogleFontLoader
          fonts={[{ font: 'Roboto', weights: [400, '400i'], }, { font: 'Roboto Mono', weights: [1000, 700], },]}
          subsets={['cyrillic-ext', 'greek']}
        />
      </>
      <h1 className= "title" style={{ fontFamily: 'Roboto Mono, monospaced' }}> Bienvenue sur le réseau social </h1>
      <div style={{ margin: "80px" }}>
        <NewPost/>
        <DisplayPosts/>
      </div>
    </>
  )
}

export default Home;
