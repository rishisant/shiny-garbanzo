

import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
import './ManagerStyle.css';
import {raise_admin_bar} from './HomeFunctions';
import './TableStyle.css';
import { print_All_Vals, products, ingredients, prices } from './Server';
import { initVals } from './Home';
import {useNavigate} from 'react-router-dom';
import {translate} from './HomeFunctions';

const ViewEmployees = () => {
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "This is a list of all employees and their information.",
        "All Employees",
        "Name",
        "Title",
        "Date of Hire",
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
        
        getEmployees();
        initVals();
    }, []);
    var IS_employees = [];
    // var IS_products = [];
    var IS_ids = [];
    const [employees, setEmployees] = useState(IS_employees);
    // const [products, setProducts] = useState(IS_products);
    //fetch the getorders function from the server
    const getEmployees = async () => {
        console.log("started getEmployees");
        fetch('https://hssbackend.herokuapp.com/get_employees')
        .then(res => res.json())
        .then(res => {
            let newEmployees = [ ...employees];
                for (var i = 0; i < res.length; i++){
                    var date_i = res[i].date_of_hire;
                    date_i = date_i.substring(0,date_i.length-14);
                    newEmployees.push({employee_id: i, employee_name: res[i].employee_name, employee_title: res[i].employee_title, date_of_hire:date_i});
                }
                setEmployees(newEmployees);
        })
    }

    const renderEmployees = () =>{
        // pairProduct();
        return employees.map(({ employee_id, employee_name, employee_title, date_of_hire}) => {
        return <tr key={employee_id}>  
            <td style = {{textAlign : 'center'}}>{employee_name}</td>
            <td style = {{textAlign : 'center'}}>{employee_title}</td>  
            <td style = {{textAlign : 'center'}} >{date_of_hire}</td>   
        </tr>    
        });
    } 
    

    const dropdownStyle = {
        fontSize: '25px',
        fontFamily: 'Roboto Slab',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '5px',
        margin: '5px',
        marginTop: '25px',
        marginBottom: '20px',
        width: '10%',
        height: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    };
    const checkboxStyle = {
        // center the textbox and make the box bigger, font size= 25px
        fontSize: '25px',
        fontFamily: 'Roboto Slab',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '5px',
        margin: '5px',
        marginTop: '20px',
        marginBottom: '20px',
        width: '10%',
        height: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    };

    const navigate = useNavigate();
    return (
        <div>
          <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/Manager')} alt="Logo"></img>
                <div className="textbut1">
                {translatedTextList[0]}
                </div>
                
                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>

                <div id="tablediv">
                    <table className="table_s" > 
                        <thead>
                            <tr>
                            <th colSpan="3">{translatedTextList[1]}</th>
                            </tr>
                            <tr> 
                            <th>{translatedTextList[2]}</th>  
                            <th>{translatedTextList[3]}</th> 
                            <th>{translatedTextList[4]}</th>
                            </tr>  
                        </thead>    
                        <tbody> 
                        {renderEmployees()}
                        </tbody>  
                        
                    </table>
                    
                </div>

        </div>
    );
}

export default ViewEmployees;
