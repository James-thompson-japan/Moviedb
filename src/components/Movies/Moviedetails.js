import React, { useState , useEffect} from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

const Moviedetails = ({ match }) => {

  let id = match.params.id;

  const [isloading, setIsloading] = useState(true)
  const [moviedetails, setMoviedetails] = useState()
  const [recommendedmovies, setrecommendedmovies] = useState(false)
  const [watchlistbutton, setWatchlistbutton] = useState()
  const [ontowatchlistornot, setOntowatchlistornot] = useState()
  const [onrecommendedornot, setOnrecommendedornot] = useState(false)
 

  const updatecolor = () => { 
     
      if(localStorage.getItem("movies").includes(id)){
        setWatchlistbutton("bg-red-200")
        setOntowatchlistornot("Remove from To Watch List")
        } 
      else {
        setWatchlistbutton("bg-green-200")
        setOntowatchlistornot("Add To Watch List")}
      }


 const watchlistclick = () => {

    let storedID = JSON.parse(localStorage.getItem("movies"))

      if(JSON.parse(localStorage.getItem("movies").includes(id))){

        let data = JSON.parse(localStorage.getItem("movies"))
        let indexno = data.indexOf(id)
        data.splice(indexno,1)
        localStorage.setItem("movies",JSON.stringify(data))
        updatecolor()

        } else {

        storedID.push(id)
        localStorage.setItem("movies", JSON.stringify(storedID))
        updatecolor()
      }}



  useEffect(() => {

   const fetchitems = async () => {

      const movie = await Axios(`https://api.themoviedb.org/3/movie/${id}?api_key=a39b784d90f114c0fdc967edaac2831d`);
      const recommended = await Axios(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a39b784d90f114c0fdc967edaac2831d`);

      setMoviedetails(movie.data)
      {(recommended !== []) && setrecommendedmovies(recommended.data.results)}
      
      setIsloading(false)
      updatecolor()
      window.scrollTo(0, 0);
    }
    fetchitems();
  
  },[isloading,id])



useEffect(() => {
updatecolor()
},[isloading])

useEffect(() => {
 recommendedmovies.length > 1 && setOnrecommendedornot(<h1 className="text-center font-bold text-xl font-LilitaOne underline my-10
 md:text-6xl
 ">Recommendations</h1>)
},[recommendedmovies,isloading])


  


  
  return (
    <div>

    {/* TOP NAVBAR  */}
      
    <ul className="bg-gray-300 justify-evenly mx-auto align-middle text-xl self-center items-center rounded-b-4xl flex flex-col
                     md:w-10/12 md:flex-row">

        <Link to = "/Movies"><li className = "p-1 border-b border-black md:border-none">Check out some more movies.</li></Link>
        <Link to = "/Moviessearch" className = "p-1"><li>Search for a movie</li></Link>
        </ul>

        {/* MOVIEDETAILS  */}

       {isloading ?
          
           <p className="animate-bounce text 3xl text-center m-20 ">Loading....</p>  
           
           :
           
          <div className="flex flex-col mx-auto my-10 border bg-gray-100 shadow-2xl items-center w-10/12 relative
               md:flex-row md:w-11/12 lg:mx-auto xl:w-7/12">

              <img alt="movie poster" className="object-cover h-full w-full md:w-4/12 p-2 shadow-2xl" src={`https://image.tmdb.org/t/p/w500/${moviedetails.poster_path}`}/>

              <div className="p-2 md:w-7/12">
                  <h2><strong className="text-3xl underline">{moviedetails.title}</strong> ({`${moviedetails.release_date}`.substring(0,4)})</h2>
                  <p className="italic mb-5 text-sm">{moviedetails.tagline}</p>
                  <p>{moviedetails.overview}</p>  
                  <p className="my-10">Runtime: {moviedetails.runtime} Minutes</p>
                  <p>Average score: {moviedetails.vote_average}</p>
                  <button onClick={() => watchlistclick()} className={`p-2 text-gray-600 border  rounded-lg mt-10 hover:border-gray-700 ${watchlistbutton}`}>{ontowatchlistornot}</ button>
              </div> 
          </div>
       }


   

       {onrecommendedornot}
                                           



       <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12">  

       {recommendedmovies && recommendedmovies.map(movie => movie.poster_path &&

            <Link key = {movie.id}  to = {`/Moviedetails/${movie.id}`}> 
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

export default Moviedetails
