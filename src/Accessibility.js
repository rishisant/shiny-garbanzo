import {useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import './BaseStyle.css';
import './ContrastStyle.css';
import './AccessButtons.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import './components/img/hss_bw.png';
import './components/img/subway_photo.png';
import {translate} from './HomeFunctions';

const Accessibility = () => {
    localStorage.setItem('lang', 'en');
    const currentLang = localStorage.getItem('lang');

    console.log('currentLang: ' + currentLang);

    const targetLanguage = currentLang;
    const textList = [
        "Please select which features you would like to enable. Click the logo to return back to the home page when complete. Note: Language changes do not take effect until you return to the home page.",
        "Change Contrast",
        "Larger Font Size",
        "Current Language: " + currentLang.toUpperCase(),
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
    // make a function that permanently changes the stylesheet
    function buttonClick(param1) {
        // make the button turn maroon color with cececd text when clicked
        // if param1 == 1, change accessbutton1
        // if param1 == 2, change accessbutton2
        // so on so forth
        const isclicked = localStorage.getItem('clicked' + param1);

        if (param1 == 1) {
            if (isclicked == 'true') {
                document.getElementById('accessbutton1').style.backgroundColor = '#e7e7e7';
                document.getElementById('accessbutton1').style.color = 'maroon';
                localStorage.setItem('clicked' + param1, 'false');
                // change stylesheet
                // changeStyle();
                console.log('style changed to defa');
                // change the bg image to default
                localStorage.setItem('bgimage', 'default');
                document.body.style.backgroundImage = "url('https://i.ibb.co/LP4M3qb/subway-photo.png')";
            } else {
                document.getElementById('accessbutton1').style.backgroundColor = 'maroon';
                document.getElementById('accessbutton1').style.color = '#cececd';
                localStorage.setItem('clicked' + param1, 'true');
                console.log('style changed to new')
                // changeStyle();
                localStorage.setItem('bgimage', 'hcontrast');
                document.body.style.backgroundImage = "url('https://i.ibb.co/zX15NFm/hss-bw.png')";
            }
        }
            
        if (param1 == 2) {
            if (isclicked == 'true') {
                document.getElementById('accessbutton2').style.backgroundColor = '#e7e7e7';
                document.getElementById('accessbutton2').style.color = 'maroon';
                localStorage.setItem('clicked' + param1, 'false');
                // reset the font size back to the default
                localStorage.setItem('bigfont', 'false');
                var divs = document.getElementsByTagName('div');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.fontSize = '1.05em';
                }


            } else {
                document.getElementById('accessbutton2').style.backgroundColor = 'maroon';
                document.getElementById('accessbutton2').style.color = '#cececd';
                localStorage.setItem('clicked' + param1, 'true');
                // increase font size for the whole page
                // get all divs
                localStorage.setItem('bigfont', 'true');
                var divs = document.getElementsByTagName('div');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.fontSize = '1.2em';
                }
                
            }
        }

        else if (param1 == 3) {
            localStorage.setItem('languagechosen', 'true');
            // have a language array
            const langs = ['en', 'es', 'fr', 'ja', 'zh-CN', 'zh-TW'];
            // get the current language
            const currentLang = localStorage.getItem('lang');
            // get the index of the current language
            const index = langs.indexOf(currentLang);
            // if the index is the last one, set the language to the first one
            if (index == langs.length - 1) {
                localStorage.setItem('lang', langs[0]);
            }
            // else, set the language to the next one
            else {
                localStorage.setItem('lang', langs[index + 1]);
            }
            // set the language button text to the new language
            document.getElementById('accessbutton3').innerHTML = 'Current Language: ' + localStorage.getItem('lang').toUpperCase();

        }
        return
    }

    return (
        
        <div id="homecontainer">
             
                <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/')} alt="Logo"></img>
                <div className="textbut1">
                    {translatedTextList[0]}
                
                </div>

                <div className="accesscontainer">
                    <div className="accessbutton" id="accessbutton1" onClick={()=> buttonClick(1)}>{translatedTextList[1]}</div>
                    <div className="accessbutton" id="accessbutton2" onClick={()=> buttonClick(2)}>{translatedTextList[2]}</div>
                    <div className="accessbutton" id="accessbutton3" onClick={()=> buttonClick(3)}>{translatedTextList[3]}</div>
                </div>
                

                <div id="adminpanel">
                    <panelbig>ADMIN PANEL</panelbig>
                    <img class="admin_button" id="managerlogo" src={require('./components/img/manager_transparent.png')} onClick={() => navigate('/AuthenticateM')} alt="Manager Logo"></img>
                    <paneltext>MANAGER</paneltext>
                    <img class="admin_button" id="serverlogo" src={require('./components/img/server_transparent.png')} onClick={() => navigate('/AuthenticateS')} alt="Server Logo"></img>
                    <paneltext>SERVER</paneltext>
                    <img class="admin_button" id="serverlogo" src={require('./components/img/query_transparent.png')} onClick={() => navigate('/QueryTest')} alt="Query Logo"></img>
                    <paneltext>QUERY</paneltext>
                    <img class="admin_button" id="serverlogo" src={require('./components/img/accessibility_transparent.png')} onClick={() => navigate('/Accessibility')} alt="Accessibility Logo"></img>
                    <paneltext>ACCESSIBILITY</paneltext>

                    <img class="admin_button" id="serverlogo" src={require('./components/img/googlemaps.png')} onClick={() => navigate('/GoogleMaps')} alt="Map Logo"></img>
                    <paneltext>LOCATIONS</paneltext>
                    {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
                </div>
        </div>
        
    )
};
export default Accessibility;