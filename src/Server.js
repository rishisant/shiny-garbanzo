import React from 'react';
import {useNavigate} from "react-router-dom"

const Server = () => {
    const navigate = useNavigate();
    return(
        <div>
            {/* Logo in Top Right */}
            <div id="prelogo">
                <img id="logo" alt="Click Here to Return Home" onClick={() => navigate(-1)} src={"https://i.imgur.com/Y2jdLdx.png"}></img>
            </div>
            <br></br>

            {/* Manager Div */}
            <div className = "HomeScreen-top">
                <header id="ManagerTopText">Server</header>
            </div>
            <div id="disc1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Welcome to the server screen! Here you can view the current inventory, as well as view the current orders. You can also
                view the current orders, and mark them as complete. Click on the logo in the top-right to return to the home screen.
            </div>
            <br></br>

            {/* Divs */}
            <div id="allDivs">
                <div class="box">BOX 1 (Insert a Table within this space)</div>
                <div class="box">BOX 2 (Insert a Table within this space)</div>
                <div class="box">BOX 3 (Insert a Table within this space)</div>
            </div>

            
        </div>
    )
};
export default Server;