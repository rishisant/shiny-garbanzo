import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
import './ManagerStyle.css';
import {raise_admin_bar} from './HomeFunctions';
import './TableStyle.css';
import { print_All_Vals, products, ingredients, prices } from './Server';
import { initVals } from './Home';
import {useNavigate} from 'react-router-dom';
// import { getProduct } from '../../node-postgres/test';
import {translate} from './HomeFunctions';

function ViewOrder (){
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "This is a list of all orders that have been processed. Click the logo to return back to the Server Home Page.",
        "Today",
        "Since Last Week",
        "Since Last Month",
        "Since Last Year",
        "All Time",
        "Submit Request",
        "All Orders",
        "Order ID",
        "Products",
        "Price",
        "Date",
        "Quantity",
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
    var mounted = false;
    useEffect(() => {
        if (mounted == false){
            getOrders();
            initVals();
        }
        mounted = true;
        
    }, []);
    var IS_orders = [];
    const [orders, setOrders] = useState(IS_orders);
    //fetch the getorders function from the server
    const getOrders = async () => {
        
       
        //await new Promise(resolve => setTimeout(resolve, 2000));
        fetch('https://hssbackend.herokuapp.com/get_orders')
        .then(res => res.json())
        .then(res => {
            let newOrders = [ ...orders];
                for (var i = res.length-1; i >= 0; i--){
                    //split the product id array into a string with commas
                    var product_ids = res[i].product_ids;
                    var product_ids_string = "";
                    for (var j = 0; j < product_ids.length; j++){
                        product_ids_string += product_ids[j];
                        if (j != product_ids.length - 1){
                            product_ids_string += ", ";
                        }
                    }
                    //split the product quantity array into a string with commas
                    var product_quantities = res[i].quantity;
                    var product_quantities_string = "";
                    if (product_quantities!= null){
                        for (var j = 0; j < product_quantities.length; j++){
                            product_quantities_string += product_quantities[j];
                            if (j != product_quantities.length - 1){
                                product_quantities_string += ", ";
                            }
                        }
                    }
                    //remove t and z from date
                    var date = res[i].date;
                    date = date.replace("T", " ");
                    date = date.replace("Z", "");
                    //remove the last 4 characters from the date
                    date = date.substring(0, date.length - 4);
                    //console.log(res[i].date);
                    newOrders.push({id: i, order_num: res[i].order_num, name: product_ids_string, quant: product_quantities_string, price: "$" + String(res[i].total_price), date: date});
                    //console.log(res[i].quantity);
                }
                setOrders(newOrders);

        })
        
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
        width: '20%',
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
    //render orders function
    const renderOrders = () =>{
        return orders.map(({ id, order_num, name, quant, price, date }) => {
        return <tr key={id}>  
            <td>{order_num}</td>
            <td >{name}</td> 
            <td>{quant}</td> 
            <td >{price}</td>   
            <td >{date}</td>
        </tr>    
        });
    } 

    // const timeOrder = () =>{
    //     //get the value of the dropdown menu
    //     console.log("timeOrder");
    //     var time = document.getElementById("timeperiod").value;
    //     //change the orders displayed based on the value of the dropdown menu
    //     if (time == "today"){
    //         //get today's date
    //         var today = new Date();
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //         var yyyy = today.getFullYear();
    //         today = yyyy + '-' + mm + '-' + dd;
    //         //filter the orders to only show orders from today
    //         var newOrders = orders.filter(function (el) {
    //             return el.date.includes(today);
    //         });
    //         setOrders(newOrders);
    //     }
    //     else if (time == "lweek"){
    //         //display all orders from last week
    //         //get today's date
    //         var today = new Date();
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //         var yyyy = today.getFullYear();
    //         today = yyyy + '-' + mm + '-' + dd;
    //         //get the date from a week ago
    //         var lastWeek = new Date(today);
    //         lastWeek.setDate(lastWeek.getDate() - 7);   
    //         var dd = String(lastWeek.getDate()).padStart(2, '0');
    //         var mm = String(lastWeek.getMonth() + 1).padStart(2, '0'); //January is 0!
    //         var yyyy = lastWeek.getFullYear();
    //         lastWeek = yyyy + '-' + mm + '-' + dd;
    //         let newOrders = [ ...orders];
    //         console.log(lastWeek);
    //         //filter the orders to only show orders from last week
    //         console.log(newOrders[100].date);
    //         newOrders = newOrders.filter(function (el) {
    //             return el.date.includes(lastWeek);
    //         });


    //         setOrders(newOrders);
    //     }
        

    // }

    

    const navigate = useNavigate();
    return (
        <div>
          <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/Server')} alt="Logo"></img>
                <div className="textbut1">
                {translatedTextList[0]}
                </div>
                
                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>
                

                {/* <select id="timeperiod" style={dropdownStyle} name="timeperiod">
                    
                    <option value="today">{translatedTextList[1]}</option>
                    <option value="lweek">{translatedTextList[2]}</option>
                    <option value="lmonth">{translatedTextList[3]}</option>
                    <option value="lyear">{translatedTextList[4]}</option>
                    <option value="alltime" selected>{translatedTextList[5]}</option>
                    
                </select> */}

                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>
                
                {/* <div className="homebutton" id="load_order_request" onClick={timeOrder}>Submit Request</div> */}

                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>

                <div id="tablediv">
                    <table className="table_s" width="1000" > 
                        <thead>
                            <tr>
                            <th colSpan="5">{translatedTextList[7]}</th>
                            </tr>
                            <tr > 
                            <th width="100">{translatedTextList[8]}</th> 
                            <th>{translatedTextList[9]}</th> 
                            <th>{translatedTextList[12]}</th> 
                            <th>{translatedTextList[10]}</th>
                            <th>{translatedTextList[11]}</th>
                            </tr>  
                        </thead>    
                        <tbody> 
                            {/* <tr>
                                <td>Completed</td>
                                <td style={{fontSize: '25px'}}>Callie Sub, Chocolate Chip Cookie, Medium Fountain Drink</td>
                                <td>$14.25</td>
                                <td>2021-12-11 05:13:20</td>
                            </tr> */}
                            {renderOrders()}
                        
                        </tbody>  
                        
                    </table>
                    
                </div>

        </div>
    );
}

export default ViewOrder;
