// Server Screen
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
//import React from 'react';
import './ManagerStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import React, {useState, useEffect} from 'react';

// The arrays that will store all of our products, ingredients, etc. This will be fetched from the database.
export var products = [];
export var ingredients = [];
export var prices = [];

export const print_All_Vals = () => {
    console.log("\n\nPrinting all values...");
    for (let i = 0; i < products.length; i++) {
        console.log("Product: " + products[i] + " Price: " + prices[i]);
    }
    for (let i = 0; i < ingredients.length; i++) {
        console.log("Ingredient: " + ingredients[i]);
    }
}
var count = 0;
function App() {
    let vals;
    useEffect(() => {
        getProduct();
    }, []);
    useEffect(() => {
        getIngredient();
    }, []);

    async function getProduct (){
        // remove all values from the arrays
        if (count == 0){
            
            console.log("Getting products...");
            const response = await fetch('http://localhost:3001');
            if (!response.ok) {
                throw new Error ('HTTP error! status: ' + response.status);
            }
            vals = await response.json();
            products = [];
            prices = [];
            for (let i = 0; i < vals.length; i++) {
                products.push(vals[i].description);
                prices.push(vals[i].price);
                count++;
                // console.log("Product: " + products[i] + " Price: " + prices[i]);
            }
            console.log("Home product: " + products);
        }
        count++;
    }
    
    const getIngredient = async () => {
        // remove all elements from ingredients array
        ingredients = [];
        console.log("Getting ingredients...");
        const response = await fetch('http://localhost:3001');
        if (!response.ok) {
            throw new Error ('HTTP error! status: ' + response.status);
        }
        vals = await response.json();
        for (let i = 0; i < vals.length; i++) {
            ingredients.push(vals[i].description);
            // console.log("Ingredient: " + ingredients[i]);
        }
    }
    
    const navigate = useNavigate();
    

    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div class="homebutton" id="to_order" onClick={() => navigate('/createOrder')}>Enter Order</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ViewOrders')}>View Orders/Inventory</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ContactManager')}>Contact Manager</div>
            <div class="homebutton" id="admin_panel" onClick={print_All_Vals}>Print all vals Console</div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>Admin Panel</div>
            {/* <p class="backtest">;{this.state.apiResponse}</p> */}
            <div id="adminpanel">
                <panelbig>ADMIN PANEL</panelbig>
                <img class="admin_button" id="serverlogo" src={require('./components/img/query_transparent.png')} onClick={() => navigate('/QueryTest')} alt="Query Logo"></img>
                <paneltext>QUERY</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => navigate('/')} alt="Home Logo"></img>
                <paneltext>RETURN HOME</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
        
    //}
}
//export default Server;
export default App;