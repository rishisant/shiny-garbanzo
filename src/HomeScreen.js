import {useNavigate} from 'react-router-dom';
import React from 'react';
import './Screen.css';


const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className = "HomeScreen">
            <div id="prelogo">
                <img id="logo" alt="Click Here to Return Home" onClick={() => navigate(-1)} src={"https://i.imgur.com/Y2jdLdx.png"}></img>
            </div>
            <br></br>

            {/* Manager Div */}
            <div className = "HomeScreen-top">
                <header id="ManagerTopText">Houston Street Subs</header>
            </div>
            <div id="disc1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Welcome to Houston Street Subs! Please select the type of user you are. Select which option best suits you. For our developers,
                please keep in mind that QueryTest is to be used for testing backend functionality. Accessibility is to be used for testing
                accessibility features and stylesheet implementations. Thank you!
            </div>
            <br></br>

            <div id="allDivs">
                <div class="navbox" onClick={() => navigate('/Manager')}>Manager</div>
                <div class="navbox" onClick={() => navigate('/Server')}>Server</div>
                <div class="navbox" onClick={() => navigate('/Customer')}>Customer</div>
                <div class="navbox" onClick={() => navigate('/QueryTest')}>QueryTest</div>
                <div class="navbox" onClick={() => navigate('/Accessibility')}>Accessibility</div>
            </div>

            {/* <div className='navigation-buttons'>
                <button className='manager-button' onClick={() => navigate('/Manager')}>Manager Screen</button>
                <button className='server-button' onClick={() => navigate('/Server')}>Server Screen</button>
                <button className='customer-button' onClick={() => navigate('/Customer')}>Customer Screen</button>
                <button className='querytest-button' onClick={() => navigate('/QueryTest')}>Query Screen</button>
            </div> */}
            
            
        </div>
    )
    
};
export default Home;