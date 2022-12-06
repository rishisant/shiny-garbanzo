import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Home";
import Manager from "./Manager";
import Server from "./Server";
import Customer from "./Customer";
import QueryTest from "./QueryTest";
import Accessibility from "./Accessibility";
import InDevelopment from "./InDevelopment";
import AuthenticateM from "./AuthenticateM";
import AuthenticateS from "./AuthenticateS";
import ViewOrders from "./ViewOrders";
import CreateOrder from "./CreateOrder";
import ContactManager from "./ContactManager";
import Test_Click from "./Test_Click";
import GoogleMaps from "./GoogleMaps";
import EnterOrder from "./EnterOrder";
import ViewReports from "./ViewReports";
import ViewOrdersInt from "./ViewOrdersInt";
import EnterOrderS from "./EnterOrderS";
import ViewEmployees from "./ViewEmployees";
import EditProducts from "./EditProducts";

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
        <Route exact path="/InDevelopment" element = {<InDevelopment/>}/>
        <Route exact path="/AuthenticateM" element = {<AuthenticateM/>}/>
        <Route exact path="/AuthenticateS" element = {<AuthenticateS/>}/>
        <Route exact path="/ViewOrders" element = {<ViewOrders/>}/>
        <Route exact path="/CreateOrder" element = {<CreateOrder/>}/>
        <Route exact path="/ContactManager" element = {<ContactManager/>}/>
        <Route exact path="/Test_Click" element = {<Test_Click/>}/>
        <Route exact path="/GoogleMaps" element = {<GoogleMaps/>}/>
        <Route exact path="/EnterOrder" element = {<EnterOrder/>}/>
        <Route exact path="/ViewReports" element = {<ViewReports/>}/>
        <Route exact path="/ViewOrdersInt" element = {<ViewOrdersInt/>}/>
        <Route exact path="/EnterOrderS" element = {<EnterOrderS/>}/>
        <Route exact path="/ViewEmployees" element = {<ViewEmployees/>}/>
        <Route exact path="/EditProducts" element = {<EditProducts/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

