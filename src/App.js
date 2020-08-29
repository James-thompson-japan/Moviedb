import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Towatchlist from './components/Towatchlist'
import Moviessubnavbar from './components/Moviessubnavbar'
import Moviedetails from './components/Movies/Moviedetails';
import Tvshowssubnavbar from './components/Tvshowssubnavbar';
import Moviessearch from './components/Movies/Moviessearch';
import Tvshowdetails from './components/Tvshows/Tvshowdetails';
import Tvshowsearch from './components/Tvshows/Tvshowsearch';

function App() {
  return (
    <div className="App font-LilitaOne text-gray-800">
      <Router>
        
        <Navbar/>

        <Switch>
          <Route path = "/Moviedb" exact component = {Home}/>
          <Route path = "/" exact component = {Home}/>
          <Route path = "/Movies" exact component = {Moviessubnavbar}/>
          <Route path = "/Tvshows" component = {Tvshowssubnavbar}/>
          <Route path = "/Towatchlist" component = {Towatchlist}/> 
          <Route path = "/Moviedetails/:id" component = {Moviedetails}/>
          <Route path = "/Moviessearch" component = {Moviessearch}/>
          <Route path = "/Tvshowdetails/:id" component = {Tvshowdetails}/>
          <Route path = "/Tvshowssearch" component = {Tvshowsearch}/>
        </Switch>  

      </Router>
    
    </div>
  );
}

export default App;
