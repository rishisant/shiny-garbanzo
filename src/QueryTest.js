/*
QueryTest.js
@author : @rishisant
@date: 2022-16-11 16:04:23
*/

import {useNavigate} from 'react-router-dom';
import React from 'react';
import './AltStyles.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';

const QueryTest = () => {
    const navigate = useNavigate();
    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div class="querycontainer">
                <input type="text" id="queryinput" placeholder="Enter Query Here"></input>
                <textarea id="queryresults" placeholder="Query Results"></textarea>
            </div>
            <div class="homebutton" id="test_query">Run the Query</div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>Admin Panel</div>
            <div class="textbox" id="admin_textbox">Text Box</div>
            {/* <p class="backtest">;{this.state.apiResponse}</p> */}
            <div id="adminpanel">
                <panelbig>ADMIN PANEL</panelbig>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => navigate('/')} alt="Home Logo"></img>
                <paneltext>RETURN HOME</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
        
    //}
};
export default QueryTest;
