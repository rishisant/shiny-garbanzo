import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
import './ManagerStyle.css';
import {raise_admin_bar} from './HomeFunctions';
import './TableStyle.css';
import { print_All_Vals, products, ingredients, prices } from './Server';
import { initVals } from './Home';
import {useNavigate} from 'react-router-dom';
import {translate} from './HomeFunctions';
var restock_loaded =  false;
var excess_loaded = false;
var sales_loaded = false;

const ViewReports = () => {
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "Restock reports return a list of items that need to be restocked, and sales reports return the sales by item from the order history. Once a quantity is entered, press Submit Request to re-render the table.",
        "Excess Report",
        "Restock Report",
        "Sales Report",
        "Submit Request",
        "Report",
        "Items",
        "Stock",
        "Sales",
    ];

    const [translatedTextList, setTranslatedTextList] = React.useState([]);
    var mounted = false;
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
        if (mounted == false){
            initVals();
            getOrders();
            //getProducts();
            //getInv();
        }
        mounted = true;
        
    }, []);

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

    const fieldStyle = {
        // center the div
        textAlign: 'center',
        // make the div a block element
        display: 'block',
        marginBottom: '30px'
    };

    var IS_orders = [];
    var IS_products = [];
    var IS_inv = [];
    const [orders, setOrders] = useState(IS_orders);
    const [orderTable, setOrderTable] = useState([<div></div>]);
    const [excessTable, setExcessTable] = useState([<div></div>]);
    const [restockInput, setRestockInput] = useState([<div></div>]);
    const [products, setProducts] = useState(IS_products);
    const [inv, setInv] = useState(IS_inv);
    const getOrders = () => {
        fetch('https://hssbackend.herokuapp.com/get_orders')
        .then(res => res.json())
        .then(data => {
            //populate IS_orders
            for (let i = 0; i < data.length; i++) {
                IS_orders.push({id: i, order_id: data[i].id, products: data[i].product_ids, price: data[i].price, date: data[i].date, quantity: data[i].quantity});
            }
            setOrders(IS_orders);
        })

    }
    const renderInventory = () =>{
        console.log("rendering inventory")
        return inv.map(({ id, inv_id, name, quantity }) => {
        return <tr key={id}>
            <td>{inv_id}</td>
            <td>{name}</td>
            <td>{quantity}</td>
        </tr>
        });
    }

    const getInv = () => {
        var restock_quantity = document.getElementById("restock_input").value;
        console.log("fetching inventory");
        fetch('https://hssbackend.herokuapp.com/get_inv')
        .then(res => res.json())
        .then(data => {
            //populate IS_inv if the inventory quantity is less than inputted value
            var newInv = [ ...IS_inv];
            for (let i = 0; i < data.length; i++) {
                if (data[i].quantity < restock_quantity){
                    console.log(data[i].quantity + "vs. " + restock_quantity)
                    console.log("adding " + data[i].name + " to restock list")
                    newInv.push({id: i, inv_id: data[i].ing_id, name: data[i].name, quantity: data[i].quantity});
                }
            }
            setInv(newInv);
        })
    }


    // const getProducts = () => {
    //     fetch('http://localhost:3001/getProducts')
    //     .then(res => res.json())
    //     .then(data => {

    //         //populate products
    //         for (let i = 0; i < data.length; i++) {
    //             IS_products.push({id: i, product_id: data[i].id, name: data[i].name, quantity: data[i].quantity, price: data[i].price, ingredients: data[i].ingredients});

    // const renderExcess = () =>{
    //     return menu.map(({ id, product_id, name, category, price, ing }) => {
    //     return <tr key={id} onClick={(event) => {onClickEditMenu(product_id, name, category, price, ing)}}>
    //         <td>{product_id}</td>
    //         <td>{name}</td>
    //         <td>{category}</td>
    //         <td>${price}</td>
    //         <td>{ing}</td>
    //     </tr>
    //     });
    // }
    const displayTable = () => {
        var reportType = document.getElementById("reporttype").value;
        console.log(reportType);
        if (reportType == "excess" && excess_loaded == false) {
            // var table = [];
            // var tableHeader = [];
            // //only display items that sold less than 10% of their inventory
            // for (let i = 0; i < orders.length; i++) {
                

        }
        else if (reportType == "restock" && restock_loaded == false) {
            console.log("adding restock input")
            setRestockInput(
                [<div style={fieldStyle}>
                <input type="text" id="restock_input" style={{fontFamily: 'Roboto Slab'}}placeholder="Enter restock quantity"></input>
                <button style={{fontFamily: 'Roboto Slab'}} onClick={getInv}>Submit</button>
                </div>]
                );
            
            //remove previous table
            setExcessTable([<div></div>]);
            //only display items that need to be restocked if their quantity is less than inputted value
            
            //create table
            setOrderTable([<div>
                <table className="table_s">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>
                    <tbody>
                        {renderInventory()}
                    </tbody>
                    
                </table>
            </div>]);
            


        }
        else if (reportType == "sales" && sales_loaded == false) {
            var table = [];
            var tableHeader = [];
        }
        else {
            console.log("Error: Invalid report type");
        }
        
    }

    const navigate = useNavigate();
    return (
        <div>
          <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/Manager')} alt="Logo"></img>
                <div className="textbut1">
                {translatedTextList[0]}
                </div>
                
                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>


                <select id="reporttype" style={dropdownStyle}>
                    <option value="restock">{translatedTextList[2]}</option>
                </select>

                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>
                
                <div class="homebutton" id="load_order_request" onClick={displayTable}>{translatedTextList[4]}</div>

                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>
                <div>
                    {restockInput}
                    {orderTable}
                </div>

                <div id="spacer" style={{marginBottom: '20px', visibility: 'hidden'}}>ss</div>
                {/* <div id="tablediv">
                    <table className="table_s" > 
                        <thead>
                            <tr>
                            <th colSpan="3">{translatedTextList[5]}</th>
                            </tr>
                            <tr > 
                            <th>{translatedTextList[6]}</th>  
                            <th>{translatedTextList[7]}</th> 
                            <th>{translatedTextList[8]}</th>
                            </tr>  
                        </thead>    
                        <tbody> 
                            <tr>
                                <td>Steamed Juntunen</td>
                                <td>140</td>
                                <td>52</td>
                            </tr>
                        
                        </tbody>  
                        
                    </table>
                    
                </div> */}

        </div>
    );
}

export default ViewReports;