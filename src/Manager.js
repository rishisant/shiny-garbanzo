// Manager Screen
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
import React from 'react';
import './ManagerStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import {useState, useEffect} from 'react';
import {initVals} from './Home';
import {translate} from './HomeFunctions';


const Manager = () => {
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "View Employees",
        "View Orders",
        "View Reports",
        "Admin Panel",
        "ADMIN PANEL",
        "SERVER",
        "QUERY",
        "ACCESSIBILITY",
        "RETURN HOME",
        "Edit Menu/Inventory"
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
    useEffect(() => {
        initVals();
    }, []);
    
    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ViewEmployees')}>{translatedTextList[0]}</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ViewOrdersInt')}>{translatedTextList[1]}</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/EditProducts')}>{translatedTextList[9]}</div>
            <div class="homebutton" id="to_order" onClick={() => navigate('/ViewReports')}>{translatedTextList[2]}</div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>{translatedTextList[3]}</div>


            <div id="adminpanel">
                <panelbig>{translatedTextList[4]}</panelbig>
                <img class="admin_button" id="serverlogo" src={require('./components/img/server_transparent.png')} onClick={() => navigate('/Server')} alt="Server Logo"></img>
                <paneltext>{translatedTextList[5]}</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/query_transparent.png')} onClick={() => navigate('/QueryTest')} alt="Query Logo"></img>
                <paneltext>{translatedTextList[6]}</paneltext>
                <img class="admin_button" id="accesslogo" src={require('./components/img/accessibility_transparent.png')} onClick={() => navigate('/Accessibility')} alt="Accessibility Logo"></img>
                <paneltext>{translatedTextList[7]}</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => navigate('/')} alt="Home Logo"></img>
                <paneltext>{translatedTextList[8]}</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
    
};
export default Manager;