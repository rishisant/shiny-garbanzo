// Authentication Page
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
import React from 'react';
import './AuthenticateStyle.css';
import {useEffect} from 'react';
// import {raise_admin_bar} from './HomeFunctions';
// import {raise_admin_bar} from './HomeFunctions';
import {initVals} from './Home';
import {raise_admin_bar} from './HomeFunctions';
import {translate} from './HomeFunctions';
// import { isValidManager } from './AuthentScript';

const AuthenticateM = () => {
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "Input Username",
        "Input Password",
        "Authenticate",
        "Admin Panel",
        "ADMIN PANEL",
        "ACCESSIBILITY",
        "RETURN HOME",
        "Invalid Manager. Please try again.",
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

    const navigate = useNavigate();
    var validusers = ["rishisanthanam", "mattjuntunen", "esbenegholm", "nayabrehmat", "admin"];
    var validpass = ["529009921", "630007600", "228007063", "528000730", "namu"];   
    useEffect(() => {
        initVals();
    }, []);

    // create a function to check if the user is valid using validusers[i] and validpass[i]
    // if the user is valid, then navigate to the manager page
    // if the user is not valid, then print "Invalid Manager" to the console
    function isValidManager() {
        var isvalid = false;
        var user_input = document.getElementById("username_field").value;
        var pass_input = document.getElementById("password_field").value;
        for (let i=0; i < validusers.length; ++i) {
            if (user_input === validusers[i] && pass_input === validpass[i]) {
                isvalid = true;
            }
        }
        if (isvalid) {
            // navigate to manager
            navigate('/Manager');
        }
        else {
            alert(translatedTextList[7]);
        }
    }
    
    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div id="authcontainer">
                <input type="text" class="authfield" id="username_field" placeholder={translatedTextList[0]} name="fname"></input>
                <input type="text" class="authfield" id="password_field" placeholder={translatedTextList[1]} name="fname"></input>
            </div>
            <div id="authspacer"></div>
            <div class="homebutton" id="check_auth" onClick={isValidManager}>{translatedTextList[2]}</div>
            <div id="authspacer"></div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>{translatedTextList[3]}</div>

            <div id="adminpanel">
                <panelbig>{translatedTextList[4]}</panelbig>
                <img class="admin_button" id="accesslogo" src={require('./components/img/accessibility_transparent.png')} onClick={() => navigate('/Accessibility')} alt="Accessibility Logo"></img>
                <paneltext>{translatedTextList[5]}</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => navigate('/')} alt="Home Logo"></img>
                <paneltext>{translatedTextList[6]}</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
    
};
export default AuthenticateM;