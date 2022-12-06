import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './BaseStyle.css';
import { initValsTiny } from "./Home";
import { useEffect, useState } from "react";
import { raise_admin_bar } from "./HomeFunctions";
import {useNavigate} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import {products, prices, ingredients, print_All_Vals} from './Home';


const EnterOrder = () => {
    const [x, setX] = useState(false);
    // note to matt: modify this options -> with the items in the database just as you did with the table
    const dd_options = [
        'Steamed Juntunen', 'Spicy Santhanam', 'Fried Egholm', 'Baked Rehmat'
    ];
    
    var t = "";
    useEffect(() => {
        getProduct();
        // initVals();

    }, []); 
    var count = 0;
    let test;
    var INITIAL_STATE = [];
    const [products, setProducts] = useState(INITIAL_STATE)
    function read_products(){
        //console.log("getting product in array");
        var pstring = document.getElementById("test_query_string").innerHTML;
        var d = pstring.split(" | ");
       /// console.log("Description " + d);
    }
    function read_price(){

        //console.log("getting price in array");
        var pstring1 = document.getElementById("test_query_string1").innerHTML;
        var p = pstring1.split(" | ");   
       // console.log("Price: "+ p);
    }
    const getProduct = async (t)=> {
        console.log("started getproduct");  
        fetch('https://hssbackend.herokuapp.com')
        .then(res => res.json())
        .then(res => {   
            //console.log("About to get info from query");
                let newProducts = [ ...products];
                for (var i = 0; i < res.length; i++){
                    newProducts.push({id: i, name: res[i].description, price: res[i].price});
                }
                setProducts(newProducts);
            
            // for (t in res) { 
            //     if(count == 0){
            //         document.getElementById("test_query_string").innerHTML += res[t].description + " | ";
            //         document.getElementById("test_query_string1").innerHTML += res[t].price + " | ";
            //         d.push(res[t].description);
            //         p.push(res[t].price);
            //     }         
            // }
            // for (var i = 0; i < d.length; i++) {  
            //     INITIAL_STATE.push({id: i, name: d[i], price: p[i]});
            // }  
            // if (count  == 1){   
            //     //console.log("if statement for creation of arrays");
            //     read_products();  
            //     read_price(); 
            //     for (var i = 0; i < d.length; i++) {  
            //         INITIAL_STATE.push({id1: i, name: d[i], price: p[i]}); 
            //     }
            //     //console.log("Initial State: " + INITIAL_STATE);
            // }
            // console.log(p);
            // console.log(d);
            console.log("End of getProduct");

        })
        console.log("x")

    }


    const renderProducts = () =>{
        console.log("render products");
        
        return products.map(({ id1, name, price }) => { 
        {console.log("mapped")}   

        return <tr key={id1} >  
        <td >{name}</td>  
        <td >{price}</td>   
     
        </tr>    


        }) 
    } 

    useEffect(() => {
        initValsTiny();
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
      document.getElementById("contmanager").value = "Message sent!";
    }

    const navigate = useNavigate();
    return (
        <div>
          <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/Server')} alt="Logo"></img>
                <div className="textbut1">
                Enter any orders here that you would like to send to the kitchen. Note that each time you press send, a new order will be sent.
                
                Click on the logo to return back to the Server menu page.
                </div>

                <div className="tablecontainer">
            <div id="flexrow">
                <div id="tablediv">
                    <table className="table_s" > 
                        <thead>
                            <tr > 
                            <th>Product</th>  
                            <th>Price</th> 
                            </tr>  
                        </thead>    
                        <tbody> 
                        

                        {renderProducts()}    
                        </tbody>  
                    </table>
                </div>

                <div id="tablediv">
                    <table className="table_s" > 
                        <thead>
                            <tr>
                                <th colSpan="2">Current Order</th>
                            </tr>
                            <tr> 
                            <th>Product</th>  
                            <th>Quantity</th> 
                            </tr>  
                        </thead>    
                        <tbody> 
                            <tr>
                            <td>Steamed Juntunen</td>
                            <td>3</td>
                            </tr>
                            <tr>
                            <td>Fried Egholm</td>
                            <td>10</td>
                            </tr>
                        
                        
                        

                        {/* {renderProducts()}     */}
                        </tbody>  
                        <td>Price</td>
                        <td>$ 14.00</td>
                    </table>
                </div>

                <div className="addtoorder">
                    <Dropdown className="dropdown" options={dd_options} placeholder="Select an option" />
                    <input id="quantfield" placeholder="Quantity"></input>
                    <button className="addtoorderbutton">Add to Order</button>
                </div> 
            </div>
        </div>
                
                <div class="homebutton" id="submitmnrequest" onClick={send_To_Manager}>Submit Request</div>

        </div>
    );
}

export default EnterOrder;
