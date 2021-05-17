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

  );
}

export default App;
