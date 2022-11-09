import React from 'react';
import {useNavigate} from "react-router-dom"

const Accessibility = () => {
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
                <header id="ManagerTopText">Accessibility</header>
            </div>
            <div id="disc1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Please select the type of accessibility you would like to use. If you would like to use the default accessibility, please select the default option.
                We have multiple options for accessibility, including but not limited to: colorblindness, dyslexia, and deafness.
            </div>

            {/* Divs */}
            <div id="accessDivs">
                <div id="checkBox">Access Check 1</div>
                <div id="checkBox">Access Check 2</div>
                <div id="checkBox">Access Check 3</div>
            </div>
        </div>
    )
};
export default Accessibility;