// Home screen
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
import React from 'react';
import './BaseStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';


const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div class="homebutton" id="to_order" onClick={() => navigate('/InDevelopment')}>Start Your Order</div>
            <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>Admin Panel</div>


            <div id="adminpanel">
                <panelbig>ADMIN PANEL</panelbig>
                <img class="admin_button" id="managerlogo" src={require('./components/img/manager_transparent.png')} onClick={() => navigate('/AuthenticateM')} alt="Manager Logo"></img>
                <paneltext>MANAGER</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/server_transparent.png')} onClick={() => navigate('/AuthenticateS')} alt="Server Logo"></img>
                <paneltext>SERVER</paneltext>
                <img class="admin_button" id="serverlogo" src={require('./components/img/query_transparent.png')} onClick={() => navigate('/InDevelopment')} alt="Query Logo"></img>
                <paneltext>QUERY</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
        </div>
        
    )
    
};
export default Home;