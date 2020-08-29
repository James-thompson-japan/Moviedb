import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const [menuicon, setMenuicon] = useState("fa-bars");
  const [shownavbar, setShownavbar] = useState(false);


const handleNavbar = () => {

    menuicon === "fa-bars" ? setMenuicon("fa-times-circle") : setMenuicon("fa-bars");
    shownavbar ? setShownavbar(false) : setShownavbar(true)

}

  return (
    <div>

      {shownavbar && 
          <div className = "min-h-screen fixed w-8/12 bg-gray-900 z-40 text-white" >

            <ul className ="flex flex-col justify-evenly text-3xl p-4 h-72">

              <Link onClick = {handleNavbar} to = "/"><li>- Home</li></Link>
              <Link to = "/Movies"> <li onClick = {handleNavbar} className = "cursor-pointer">- Movies</li></Link>
              <Link to = "/Tvshows"> <li className = "cursor-pointer" onClick = {handleNavbar}>- TV Shows</li></Link>
              <Link onClick = {handleNavbar} to = "/Towatchlist"><li>- To Watch List</li></Link>

            </ul>
            
          </div>
     }



     <div className=" bg-gray-900 text-gray-100 flex justify-between items-center p-5 z-10 h-24"> 

         <Link to = "/"><h2 className="font-bold text-5xl">MovieDB</h2></Link>

          <ul className="hidden
                        md:flex w-10/12 justify-evenly text-2xl
                        lg:text-4xl xl:w-8/12">

          <Link to = "/"> <li className="font-thin navbarline">Home</li></Link>
          <Link to = "/Movies"> <li className="font-thin  navbarline">Movies</li></Link>
          <Link to = "/Tvshows"> <li className="font-thin  navbarline">Tv Shows</li></Link>
          <Link to = "/Towatchlist"> <li className="font-thin  navbarline">To Watch List</li></Link>

      </ul>

      <i onClick = {handleNavbar} className={`cursor-pointer fas fa-3x ${menuicon} md:hidden`}></i>

    </div> 


    </div>
  )
}

export default Navbar
