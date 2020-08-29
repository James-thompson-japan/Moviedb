import React from 'react'
import MovieAPIcall from './Movies/MovieAPIcall'
import TvAPIcall from './Tvshows/TvAPIcall'

const Home = () => {

  if(localStorage.getItem("movies") === null){
    localStorage.setItem("movies", JSON.stringify([]))
    }
  if(localStorage.getItem("tvshows") === null){
      localStorage.setItem("tvshows", JSON.stringify([]))
      }

  return (
    <div>
      <MovieAPIcall searchfor = {"now_playing"} title={"Movies Now Showing"}/>
      <TvAPIcall searchfor = {"on_the_air"} title={"TV Shows Now Airing"}/>
      
    </div>
  )
}

export default Home
