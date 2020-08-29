import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

const Moviessearch = () => {

  const [isloading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchresults, setSearchresults] = useState()

  useEffect(() => {
    const fetchitems = async () => {
    const result = await Axios (`https://api.themoviedb.org/3/search/movie?api_key=a39b784d90f114c0fdc967edaac2831d&query=${search}`);
      setSearchresults(result.data.results);
      setIsloading(false);
    }

     search !== "" && fetchitems();

  },[isloading,search])



  return (

    <div>

      <input className="border-gray-600 mx-auto w-10/12 border block m-10 p-4 focus:outline-none
      md:w-5/12" 
      placeholder = "Search for a movie" 
      type = "text" 
      onChange = {(e) => setSearch(e.target.value)}
      value = {search}
      />


        <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12"> 

          {(search !== "" && !isloading) && 

          searchresults.map(movie => 
          
          (movie.poster_path && movie.vote_count > 50) &&

          <Link key = {movie.id} to = {`moviedetails/${movie.id}`}> 
          
          <img alt = {`${movie.title} Poster`}  
          className="m-1 h-64 object-cover 
          lg:m-5 lg:h-68" 
          src = {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
          
          </Link>
         
         )}
     
         </div>

</div>
  )
}

export default Moviessearch
