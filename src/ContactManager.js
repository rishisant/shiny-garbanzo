import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './BaseStyle.css';
import { initVals } from "./Home";
import { useEffect } from "react";
import { raise_admin_bar } from "./HomeFunctions";
import {useNavigate} from 'react-router-dom';
import {translate} from './HomeFunctions';

const ContactManager = () => {
  const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "Leave a message for the manager, and we will get back to you as soon as possible! Note that each time you press send, a new message will be sent. Click the logo to return back to the Server menu page.",
        "Enter your message here.",
        "Submit Request",
        "Message sent!",
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

    useEffect(() => {
        initVals();
    }, []);

    const txtstyle = {
      width: "22%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      fontSize: "16px",
      marginTop: "30px",
      marginBottom: "35px",
      resize: "vertical",
      // center
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
    };

    const send_To_Manager = () => {
      // get the text from the text box
      var text = document.getElementById("contmanager").value;
      // empty the text box
      document.getElementById("contmanager").value = translatedTextList[3];
    }

    const navigate = useNavigate();
    return (
        <div>
          <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/Server')} alt="Logo"></img>
                <div className="textbut1">
                {translatedTextList[0]}
                </div>
                <textarea id="contmanager" style={txtstyle} name="message" rows="10" cols="30" placeholder={translatedTextList[1]}></textarea>
                
                <div class="homebutton" id="submitmnrequest" onClick={send_To_Manager}>{translatedTextList[2]}</div>

        </div>
    );
}

export default ContactManager;
