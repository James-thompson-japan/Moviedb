import React, { useState , useEffect} from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

const Towatchlist = () => {

  const [tvshowsareloading, setTvshowsareloading] = useState(true)
  const [moviesareloading, setMoviesareloading] = useState (true);
  const [favemovies, setFavemovies] = useState([]);
  const [favetvshows, setFavetvshows] = useState([])
  const [refresh, setRefresh] = useState()

  
// CLEAR ALL MOVIES 

 const clearlocalstorage = () => {
   localStorage.setItem('movies', JSON.stringify([]))
   localStorage.setItem('tvshows', JSON.stringify([]))
   window.location.reload(true)
 }


// GET MOVIES 
 useEffect(() => {
     const fetchitems = async () => {
     const movies = await JSON.parse(localStorage.getItem("movies")) || [];
     const results = Promise.all(movies.map(id => Axios(`https://api.themoviedb.org/3/movie/${id}?api_key=a39b784d90f114c0fdc967edaac2831d`).then(results => {
      favemovies.push(results.data)
        {(JSON.parse(localStorage.getItem("movies"))).length === favemovies.length && setMoviesareloading(false)}
      })
      ))
   }
   fetchitems()
 },[])


//  GET TV SHOWS 
 useEffect(() => {
    const fetchitems = async () => {
    const tvshows = await JSON.parse(localStorage.getItem("tvshows")) || [];
    const tvshowresults = Promise.all(tvshows.map(id => Axios(`https://api.themoviedb.org/3/tv/${id}?api_key=a39b784d90f114c0fdc967edaac2831d`).then(tvshowresults => {
     favetvshows.push(tvshowresults.data)
        {(JSON.parse(localStorage.getItem("tvshows"))).length === favetvshows.length && setTvshowsareloading(false)}  
      })
      ))
   }
   fetchitems()
 },[])


  return (

    <div>


      {/* CHECK IF THERE ARE ITEMS ON WATCHLIST  */}

      {((localStorage.getItem("movies") === "[]") & (localStorage.getItem("movies") === "[]")) ? 
      
      <h2 className="text-center font-bold text-4xl font-LilitaOne  underline my-10
      md:text-6xl">Your watchlist is empty</h2> 
      
      : 


      <div className="text-center">
          <h2 className="text-center font-bold text-4xl font-LilitaOne  underline my-10
          md:text-6xl">To watch List</h2> 
      </div>
      }


    {/* SHOW MOVIES  */}
      {(localStorage.getItem("movies") !== "[]") &&  <h2 className="text-center font-bold text-2xl font-LilitaOne  underline my-10
      md:text-3xl">Movies To Watch</h2>}


      <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12">  

      {(localStorage.getItem("movies") !== "[]") && moviesareloading ? 
      
      <p className="animate-bounce text-5xl text-center m-20">Loading....</p> :

      favemovies.map(movie => movie.poster_path &&

     
      
      <div key = {movie.id} className="relative my-10">
      <Link  to = {`moviedetails/${movie.id}`}>   <img alt = {`${movie.title} Poster`}  className="mx-2 h-64 object-cover lg:m-5 lg:h-68" 
         src = {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></Link>

        <div 
          onClick={() => {

            let data = JSON.parse(localStorage.getItem("movies"))
            let newdata = data.filter(item => item !== movie.id.toString())
           
            localStorage.setItem('movies', JSON.stringify(newdata))
            window.location.reload(true)
            {(JSON.parse(localStorage.getItem("movies")) === [])  &&  localStorage.removeItem('movies')}}}

           className="text-center cursor-pointer hover:text-white  bg-red-400 rounded-full mx-auto w-6/12 m-1
                      lg:w-3/12"
           >Remove</div>

       </div>

       

      )}
     </div> 

    
    {/* SHOW TV SHOWS  */}

     {(localStorage.getItem("tvshows") !== "[]") &&  <h2 className="text-center font-bold text-2xl font-LilitaOne  underline my-10
      md:text-3xl">TV Shows To Watch</h2>}


      <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12">  

      {(localStorage.getItem("tvshows") !== "[]") && tvshowsareloading ? 
      
      <p className="animate-bounce text-5xl text-center m-20">Loading....</p> :

      favetvshows.map(tvshow => tvshow.poster_path &&

      
      
      <div  key = {tvshow.id} className="relative my-10">
      <Link to = {`Tvshowdetails/${tvshow.id}`}>  <img alt = {`${tvshow.title} Poster`}  className="mx-2 h-64 object-cover lg:m-5 lg:h-68" 
         src = {`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}/> </Link>

        <div 
          onClick={() => {
            let data = JSON.parse(localStorage.getItem("tvshows"))
            let indexno = data.indexOf(tvshow.id)
            console.log(tvshow.id)
           let newdata = data.filter(item => item !== tvshow.id.toString())
           console.log(newdata)
            // indexno === 0 ? data.splice(indexno,1) : data.shift()
            localStorage.setItem('tvshows', JSON.stringify(newdata))
            window.location.reload(true)
            {(JSON.parse(localStorage.getItem("tvshows")) === [])  &&  localStorage.removeItem('tvshows')}}}

            className="text-center cursor-pointer hover:text-white  bg-red-400 rounded-full mx-auto w-6/12 m-1
                       lg:w-3/12">
           Remove</div>
       </div>
      

      )}
     </div> 



     { ( (localStorage.getItem("movies") === "[]") && (localStorage.getItem("tvshows") === "[]") ) 
     ?   null :      
     <button className="block text-center p-1 w-5/12  rounded-full mx-auto text-sm my-10
          lg:w-3/12" 
          onClick = {() => clearlocalstorage()}>CLEAR TO WATCH LIST <i className="cursor-pointer fas fa-x fa-times-circle"></i></button>
     }
    </div>
  )
}

export default Towatchlist
