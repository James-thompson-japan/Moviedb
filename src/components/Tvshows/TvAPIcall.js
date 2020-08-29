import React, { useEffect, useState} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const TvAPIcall = ({searchfor,title}) => {


  const [isloading, setIsloading] = useState(true);
  const [tvshows, setTvshows] = useState();

  useEffect(() => {
    const fetchitems = async () => {

      const result = await Axios (`https://api.themoviedb.org/3/tv/${searchfor}?api_key=a39b784d90f114c0fdc967edaac2831d`);
      setTvshows(result.data.results)
      setIsloading(false)

    }
    fetchitems();
  },[isloading,searchfor]);



  return (

    <div>
      <h1 className="text-center font-bold text-4xl font-LilitaOne underline my-10
      md:text-6xl
      ">{title}</h1>

      <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12"> 
      {isloading ? 

         <p className="animate-bounce text-5xl text-center m-20">Loading....</p> :

         tvshows.map(tvshow => 

         tvshow.poster_path &&

        <Link key = {tvshow.id}  to = {`/Tvshowdetails/${tvshow.id}`}>  
        
        <img 
        alt = {`${tvshow.name} Poster`} 
        className="m-1 h-64 object-cover 
                   lg:m-5 lg:h-68" 
        src = {`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}/>
        
        </Link>

         )

         }
      </div>
    </div>

  )
}

export default TvAPIcall