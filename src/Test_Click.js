// Manager Screen
// @author: @rishisant
// @date: 2022-12-11

import {useNavigate} from 'react-router-dom';
import React from 'react';
import './ManagerStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import {changeHTML} from './Test_Click_FCT';


const Test_Click = () => {
    const navigate = useNavigate();
    
    return (
        <div id="homecontainer">
            <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            <div id="grab" class="homebutton">Bologna Sandwich</div>
            <div id="display" class="homebutton" onClick={changeHTML}>The value of the text is: </div>
        </div>
        
    )
    
};
export default Test_Click;