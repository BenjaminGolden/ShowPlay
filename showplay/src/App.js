import React from 'react';
//deployed to github, so using Hashrouter instead of BrowserRouter
// import { HashRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import {ApplicationViews} from "./components/ApplicationViews";


function App() {
  return (
    
      <div className="ShowPlay">
        <Route>
            <ApplicationViews />
        </Route>
  
      </div>
    // <div className="App">
    //   <header className="App-header">
        
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
