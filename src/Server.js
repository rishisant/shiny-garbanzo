// Server Screen
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
//import React from 'react';
import './ManagerStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import React, {useState, useEffect} from 'react';
import {initVals} from './Home';
import {translate} from './HomeFunctions';

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
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "Enter Order",
        "View Orders",
        "Contact Manager",
        "Admin Panel",
        "ADMIN PANEL",
        "QUERY",
        "ACCESSIBILITY",
        "RETURN HOME",
    ];

    const [translatedTextList, setTranslatedTextList] = React.useState([]);

    useEffect(() => {
        async function trans() {
            const transList = [];
            for (let i = 0; i < textList.length; i++) {
                let translatedText = await translate(textList[i], targetLanguage);
                transList.push(translatedText);
            }
            setTranslatedTextList(transList);
        }
        trans();
    }, []);
    
    let vals;
    useEffect(() => {
        getProduct();
    }, []);
    useEffect(() => {
        initVals();
    }, []);
    useEffect(() => {
        getIngredient();
    }, []);

    async function getProduct (){
        // remove all values from the arrays
        if (count == 0){
            
            console.log("Getting products...");
            const response = await fetch('https://hssbackend.herokuapp.com');
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
        const response = await fetch('https://hssbackend.herokuapp.com');
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
            <div class="homebutton" id="to_order" onClick={() => navigate('/EnterOrderS')}>{translatedTextList[0]}</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ViewOrders')}>{translatedTextList[1]}</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ContactManager')}>{translatedTextList[2]}</div>
            {/* <div class="homebutton" id="admin_panel" onClick={print_All_Vals}>Print all vals Console</div> */}
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>{translatedTextList[3]}</div>
            {/* <p class="backtest">;{this.state.apiResponse}</p> */}
            <div id="adminpanel">
                <paneltext>{translatedTextList[5]}</paneltext>
                <img class="admin_button" id="accesslogo" src={require('./components/img/accessibility_transparent.png')} onClick={() => navigate('/Accessibility')} alt="Accessibility Logo"></img>
                <paneltext>{translatedTextList[6]}</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => navigate('/')} alt="Home Logo"></img>
                <paneltext>{translatedTextList[7]}</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
        
    //}
}
//export default Server;
export default App;