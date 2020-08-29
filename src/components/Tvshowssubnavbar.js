import React, { useState } from 'react'
import Tvshowsearch from './Tvshows/Tvshowsearch'
import TvAPIcall from './Tvshows/TvAPIcall'


const Tvshowssubnavbar = () => {

  const [whichtab, setWhichtab] = useState("Top rated");

    
  return (
    <div>
         <ul className="bg-gray-300 w-10/12 justify-evenly mx-auto align-middle text-xl self-center items-center rounded-b-4xl flex flex-col p-2
                           md:flex-row">

          <li onClick = {() => setWhichtab("Top rated")} className = "darknavbarline cursor-pointer p-1 border-b border-t border-black md:border-none">Top Rated TV Shows</li>
          <li onClick = {() => setWhichtab("Popular")} className = "darknavbarline cursor-pointer p-1 border-b border-black md:border-none">Popular TV Shows</li>
          <li onClick = {() => setWhichtab("Search")} className = "darknavbarline cursor-pointer p-1 border-b border-black md:border-none">Search For a TV Show</li>

        </ul>

       {whichtab === "Top rated" &&  <TvAPIcall searchfor = {"top_rated"} title={"Top Rated TV Shows"}/>} 
       {whichtab === "Popular" &&  <TvAPIcall searchfor = {"popular"} title={"Popular TV Shows"}/>} 
       {whichtab === "Search" &&  <Tvshowsearch/>} 
    
       
    </div>
  )
}

export default Tvshowssubnavbar
