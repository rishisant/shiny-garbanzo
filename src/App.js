import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./HomeScreen";
import Manager from "./Manager";
import Server from "./Server";
import Customer from "./Customer";
import QueryTest from "./QueryTest";
import Accessibility from "./Accessibility";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes> 
        <Route exact path="/" element= {<Home/>}/>
        <Route exact path="/Manager" element = {<Manager/>}/>
        <Route exact path="/Server" element = {<Server/>}/>
        <Route exact path="/Customer" element = {<Customer/>}/>
        <Route exact path="/QueryTest" element = {<QueryTest/>}/>
        <Route exact path="/Accessibility" element = {<Accessibility/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

