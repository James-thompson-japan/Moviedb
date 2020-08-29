import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'


const Tvshowdetails = ({match}) => {
  const id = match.params.id;
  const [isloading , setIsloading] = useState(true);
  const [show, setShow] = useState();
  const [recommendedtv, setRecommendedtv] = useState([])
  const [watchlistbutton, setWatchlistbutton] = useState()
  const [ontowatchlistornot, setOntowatchlistornot] = useState()
  const [onrecommendedornot, setOnrecommendedornot] = useState(false)



  const updatecolor = () => {
    if(JSON.parse(localStorage.getItem("tvshows")).includes(id)){
      setWatchlistbutton("bg-red-200")
        setOntowatchlistornot("Remove from To Watch List")
        } 
      else {
        setWatchlistbutton("bg-green-200")
        setOntowatchlistornot("Add To Watch List")}
      }


 const watchlistclick = () => {
    let storedID = JSON.parse(localStorage.getItem("tvshows"))
    if(localStorage.getItem("tvshows").includes(id)){
      let data = JSON.parse(localStorage.getItem("tvshows"))
      let index = data.indexOf(id)
      data.splice(index,1)
      localStorage.setItem("tvshows",JSON.stringify(data))
      updatecolor()
    } else {
      storedID.push(id)
      localStorage.setItem("tvshows", JSON.stringify(storedID))
      updatecolor()
    }
  }




  useEffect(() => {
    updatecolor()
    },[isloading])


    useEffect(() => {
      const fetchitems = async () => {
      const result = await Axios (`https://api.themoviedb.org/3/tv/${id}?api_key=a39b784d90f114c0fdc967edaac2831d`)
      const recommendations = await Axios(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=a39b784d90f114c0fdc967edaac2831d`)
      setRecommendedtv(recommendations.data.results)
      setShow(result.data)
      setIsloading(false);
      updatecolor();
      window.scrollTo(0, 0)
    }
    fetchitems()
  },[isloading, id])

  useEffect(() => {
    recommendedtv.length > 1 && setOnrecommendedornot(<h1 className="text-center font-bold text-xl font-LilitaOne underline my-10
   md:text-6xl
   ">Recommendations</h1>)
  },[recommendedtv,isloading])



  return (

    <div>

  {/* TOP NAVBAR  */}
      
       <ul className="bg-gray-300 justify-evenly mx-auto align-middle text-xl self-center items-center rounded-b-4xl flex flex-col
                     md:w-10/12 md:flex-row">

         <Link to = "/Tvshows"><li className = "p-1 border-b border-black md:border-none">Go back to TV Shows</li></Link>
         <Link to = "/Tvshowssearch"><li className = "p-1">Search for a TV Show</li></Link>

       </ul>


    {/* TV SHOW DETAILS  */}


      {isloading ? 
      
      <p className="animate-bounce text 3xl text-center m-20 ">Loading....</p>   :


        <div>
      <div className="flex flex-col mx-auto my-10 border bg-gray-100 shadow-2xl items-center w-10/12
      md:flex-row md:w-11/12 lg:mx-auto xl:w-7/12
      ">

        <img alt="tv show poster" className="object-cover h-full w-full md:w-4/12 p-2 shadow-2xl" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}/>

        <div className="md:w-7/12">

          <h2 className="p-3">
          
          <strong className="text-3xl">{show.name}</strong> 
          ({show.first_air_date.substring(0,4)} - {show.last_air_date.substring(0,4)}) 
          ({show.in_production ? "Still airing" : "Finished"})
          </h2>

          <p className="p-3">{show.overview}</p>

          <p className="p-3">Average score: {show.vote_average}</p>
          <button onClick={() => watchlistclick()} className={`p-2 text-gray-600 border m-5 rounded-lg mt-10 ${watchlistbutton} hover:border-gray-700`}>{ontowatchlistornot}</button>

        </div>
      </div>



     {onrecommendedornot}

       <div className = "flex flex-wrap justify-center mx-auto lg:w-10/12">  
       {recommendedtv && 
        recommendedtv.map(tvshow => 
          tvshow.poster_path &&

            <Link key = {tvshow.id}  to = {`/Tvshowdetails/${tvshow.id}`}> 
            <img alt = {`${tvshow.title} Poster`} 
            className="m-1 h-64 object-cover lg:m-5 lg:h-68" 
            src = {`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}/>
            </Link>
       )}
      </div>
      </div>
      }
    </div>
  )
}

export default Tvshowdetails
