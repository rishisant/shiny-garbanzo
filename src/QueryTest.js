
import React from 'react';
//import {linkFTB} from './TestFile.js'
import {useNavigate} from "react-router-dom"

const QueryTest = () => {
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
                <header id="ManagerTopText">Query Test</header>
            </div>
            <div id="disc1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Welcome to the query test screen! This is for Matt Senpai. Click on the logo in the top-right to return to the home screen.
                ありがとう、マット先輩。助かったぞ！
            </div>
            {/* <div id="test">
                <p> Name: <%=teammembers[0].student_name%></p>
            </div> */}

            {/* Divs */}
            
            <div id="sampletext">Query Displayer</div>
            {/* <div class="tinybox">Display the results from a Query here!
                <div id="test">
                    <p> Name: </p>
                </div>
            </div> */}
            <div className="tinybox">Display the results from a Query here!</div>
            <br></br>
            {/* <button id="samplebutton">CLick me if you want to see word change</button> */}


            <div id="sampletext">Table Displayer</div>
            <div id="allDivs">
                <div class="box">QUERY TEST TABLE 1 (Insert a Table within this space)</div>
            </div>

            {/* Return Home Screen
            <div>
                <button onClick={() => navigate(-1)}>Go Back Home</button>
            </div> */}
        </div>
    )
};
export default QueryTest;
