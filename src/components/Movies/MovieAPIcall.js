import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'


const MovieAPIcall = ({searchfor, title}) => {

  const [isloading, setIsloading] = useState(true);
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchitems = async () => {

      const result = await Axios (`https://api.themoviedb.org/3/movie/${searchfor}?api_key=a39b784d90f114c0fdc967edaac2831d`);
      setMovies(result.data.results)
      setIsloading(false)
      
    }
    fetchitems();
  },[isloading]);



  return (
    <div>
      <h1 className="text-center font-bold text-4xl font-LilitaOne underline my-10
      md:text-6xl
      ">{title}</h1>

      <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12"> 
      {isloading ? 

         <p className="animate-bounce text-5xl text-center m-20">Loading....</p> :

        movies.map(movie => 
          
          movie.poster_path &&

          <Link key = {movie.id} to = {`moviedetails/${movie.id}`}> 

          <img alt = {`${movie.title} Poster`}  
          className="m-1 h-64 object-cover 
                      lg:m-5 lg:h-68" 
          src = {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
          
          </Link>

         )

         }
      </div>
    </div>
  )
}

export default MovieAPIcall 
