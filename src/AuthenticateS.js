// Authentication Page
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
import React from 'react';
import './AuthenticateStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import { isValidServer } from './AuthentScript';
import { print_All_Vals, products, ingredients, prices } from './Home';

const AuthenticateS = () => {
    const navigate = useNavigate();
    
    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div id="authcontainer">
                <input type="text" class="authfield" id="username_field" defaultValue="Input Username" name="fname"></input>
                <input type="text" class="authfield" id="password_field" defaultValue="Input Password" name="fname"></input>
            </div>
            <div id="authspacer"></div>
            <div class="homebutton" id="check_auth" onClick={isValidServer}>Authenticate</div>
            <div class="homebutton" id="admin_panel" onClick={print_All_Vals}>Print all vals Console</div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>Admin Panel</div>


            <div id="adminpanel">
                <panelbig>ADMIN PANEL</panelbig>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => navigate('/')} alt="Home Logo"></img>
                <paneltext>RETURN HOME</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
    
};
export default AuthenticateS;