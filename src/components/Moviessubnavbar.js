import React, { useState } from 'react'
import Moviessearch from './Movies/Moviessearch'
import MovieAPIcall from './Movies/MovieAPIcall'


const Moviessubnavbar = () => {

  const [whichtab, setWhichtab] = useState("Top rated");

    
  return (
    <div>
        <ul className="bg-gray-300 w-10/12 justify-evenly mx-auto align-middle text-xl self-center items-center rounded-b-4xl flex flex-col p-2
        md:flex-row
        ">
          <li onClick = {() => setWhichtab("Top rated")} className = "darknavbarline cursor-pointer p-1 border-b border-t border-black md:border-none">Top Rated Movies</li>
          <li onClick = {() => setWhichtab("Popular")} className = "darknavbarline cursor-pointer  p-1 border-b border-black md:border-none">Popular Movies</li>
          <li onClick = {() => setWhichtab("Search")} className = "darknavbarline cursor-pointer  p-1 border-b border-black md:border-none">Search For a Movie</li>
        </ul>

       {whichtab === "Top rated" &&  <MovieAPIcall searchfor = {"top_rated"} title={"Top Rated Movies"}/>} 
       {whichtab === "Popular" &&  <MovieAPIcall searchfor = {"popular"} title={"Popular Movies"}/>} 
       {whichtab === "Search" &&  <Moviessearch/>} 
    
       
    </div>
  )
}

export default Moviessubnavbar
