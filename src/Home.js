 // Home screen
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import './BaseStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import {translate} from './HomeFunctions';
import { useState } from 'react';

// q: what should i download for react to get useLocalStorage?
// a: npm install react-localstorage-hook

// The arrays that will store all of our products, ingredients, etc. This will be fetched from the database.
export var products = [];
export var ingredients = [];
export var prices = [];

export const initVals = () => {
    // grab the background from localstorage and change it
    var bgim = localStorage.getItem('bgimage');
    if (bgim == 'default') {
        // change bg to default
        document.body.style.backgroundImage = "url('https://i.ibb.co/LP4M3qb/subway-photo.png')";
    } else {
        document.body.style.backgroundImage = "url('https://i.ibb.co/zX15NFm/hss-bw.png')";
    }

    // grab font size
    var fsize = localStorage.getItem('bigfont');
    if (fsize=="true") {
        // console.log('bigfoot is real...\n');
        // grab all divs and change fontsize to 1.5 em
        var divs = document.getElementsByTagName('div');
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.fontSize = "1.25em";
        }
        // grab text inputs and change fontsize to 1.5 em
        var inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.fontSize = ".75em";
        }

        // grab panel text and change fontsize to 1.5 em
        var paneltext = document.getElementsByTagName('paneltext');
        for (let i = 0; i < paneltext.length; i++) {
            paneltext[i].style.fontSize = "1em";
        }

    } else {
        // console.log('bigfoot is not real...\n');
        // // grab all divs and change fontsize to 1.5 em
        // var divs = document.getElementsByTagName('div');
        // for (let i = 0; i < divs.length; i++) {
        //     divs[i].style.fontSize = "1em";
        // }
    }

    console.log('initializing fontsize and bgimage');
}
export const initValsTiny = () => {
    // grab the background from localstorage and change it
    var bgim = localStorage.getItem('bgimage');
    if (bgim == 'default') {
        // change bg to default
        document.body.style.backgroundImage = "url('https://i.ibb.co/LP4M3qb/subway-photo.png')";
    } else {
        document.body.style.backgroundImage = "url('https://i.ibb.co/zX15NFm/hss-bw.png')";
    }

    // grab font size
    var fsize = localStorage.getItem('bigfont');
    if (fsize=="true") {
        // console.log('bigfoot is real...\n');
        // grab all divs and change fontsize to 1.5 em
        var divs = document.getElementsByTagName('div');
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.fontSize = "1.08em";
        }
        // grab text inputs and change fontsize to 1.5 em
        var inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.fontSize = ".75em";
        }

        // grab panel text and change fontsize to 1.5 em
        var paneltext = document.getElementsByTagName('paneltext');
        for (let i = 0; i < paneltext.length; i++) {
            paneltext[i].style.fontSize = "1em";
        }

    } else {
        // console.log('bigfoot is not real...\n');
        // // grab all divs and change fontsize to 1.5 em
        // var divs = document.getElementsByTagName('div');
        // for (let i = 0; i < divs.length; i++) {
        //     divs[i].style.fontSize = "1em";
        // }
    }

    console.log('initializing fontsize and bgimage');
}

export const print_All_Vals = () => {
    console.log("\n\nPrinting all values...");
    for (let i = 0; i < products.length; i++) {
        console.log("Product: " + products[i] + " Price: " + prices[i]);
    }
    for (let i = 0; i < ingredients.length; i++) {
        console.log("Ingredient: " + ingredients[i]);
    }
}

const Home = () => {
    // localStorage.setItem('lang', null);
    const hasChosenLang = localStorage.getItem('languagechosen');
    if (hasChosenLang != "true") {
        localStorage.setItem('lang', 'en');
    }

    var currentLang = localStorage.getItem('lang', 'en');
    if (currentLang == null) {
        console.log("setting language to english");
        localStorage.setItem('lang', 'en');
    }

    currentLang = localStorage.getItem('lang', 'en');
    // if current lang isnt one of the langs, set it to english
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;

    const navigate = useNavigate();
    let vals;
    useEffect(() => {
        getProduct();
        initVals();
    }, []);


    const textList = [
        "Start Your Order",
        "Admin Panel",
        "ADMIN PANEL",
        "MANAGER",
        "SERVER",
        "QUERY",
        "ACCESSIBILITY",
        "LOCATIONS"
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

    async function getProduct (){
        // remove all values from the arrays
        
        console.log("Getting products...");
        // NOTE for matt: Change this back to localhost:3001/products ...
        // CHANGED IT BECAUSE NEED TO COMPILE SITE
        const response = await fetch('https://hssbackend.herokuapp.com/products');
        if (!response.ok) {
            throw new Error ('HTTP error! status: ' + response.status);
        }
        vals = await response.json();
        products = [];
        prices = [];
        for (let i = 0; i < vals.length; i++) {
            products.push(vals[i].description);
            prices.push(vals[i].price);
            // console.log("Product: " + products[i] + " Price: " + prices[i]);
        }
        console.log("Home product: " + products);
    }
    
    

    
    return (
        <div id="homecontainer">
            
            {() => getProduct()}
         
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div class="homebutton" id="to_order" onClick={() => navigate('/Customer')}>{translatedTextList[0]}</div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>{translatedTextList[1]}</div>

            <div id="adminpanel">
                <panelbig>{translatedTextList[2]}</panelbig>
                <img class="admin_button" id="managerlogo" src={require('./components/img/manager_transparent.png')} onClick={() => navigate('/AuthenticateM')} alt="Manager Logo"></img>
                <paneltext>{translatedTextList[3]}</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/server_transparent.png')} onClick={() => navigate('/AuthenticateS')} alt="Server Logo"></img>
                <paneltext>{translatedTextList[4]}</paneltext>
                <img class="admin_button" id="querylogo" src={require('./components/img/query_transparent.png')} onClick={() => navigate('/QueryTest')} alt="Query Logo"></img>
                <paneltext>{translatedTextList[5]}</paneltext>
                <img class="admin_button" id="accesslogo" src={require('./components/img/accessibility_transparent.png')} onClick={() => navigate('/Accessibility')} alt="Accessibility Logo"></img>
                <paneltext>{translatedTextList[6]}</paneltext>

                <img class="admin_button" id="serverlogo" src={require('./components/img/googlemaps.png')} onClick={() => navigate('/GoogleMaps')} alt="Map Logo"></img>
                <paneltext>{translatedTextList[7]}</paneltext>

                
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>

            
        </div>
        
    )
    
};
export default Home;