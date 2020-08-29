import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'


const Tvshowsearch = () => {
  const [isloading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchresults, setSearchresults] = useState()


  useEffect(() => {
    const fetchitems = async () => {
    const result = await Axios (`https://api.themoviedb.org/3/search/tv?api_key=a39b784d90f114c0fdc967edaac2831d&query=${search}`);
      setSearchresults(result.data.results);
      setIsloading(false);
    }
     search !== "" && fetchitems();
  },[isloading,search])



  return (
    <div>
      <input className="border-gray-600 mx-auto w-10/12 border block m-10 p-4 focus:outline-none
      md:w-5/12" 
      placeholder = "Search for a TV Show" 
      type = "text" 
      onChange = {(e) => setSearch(e.target.value)}
      value = {search}
      />


<div className = "flex flex-wrap justify-center mx-auto lg:w-10/12"> 
      {(search !== "" && !isloading) && 

        searchresults.map(tvshow => 
          
          (tvshow.poster_path && tvshow.vote_count > 50) &&

         <Link key = {tvshow.id} to = {`Tvshowdetails/${tvshow.id}`}> <img alt = {`${tvshow.title} Poster`}  className="m-1 h-64 object-cover lg:m-5 lg:h-68
          md:
          " src = {`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}/></Link>
         
         )
            
         }
     
      </div>


</div>
    


    
  )
}

export default Tvshowsearch
