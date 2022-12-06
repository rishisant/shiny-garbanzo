import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './BaseStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import Dropdown from 'react-dropdown';
import {products, prices, ingredients, print_All_Vals} from './Home';
import {initValsTiny} from './Home';
import {translate} from './HomeFunctions';

var total_price = 0.0;
var completedOrder = [];

function Customer ({par}){
    const currentLang = localStorage.getItem('lang', 'en');
    console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "The Menu is displayed on the left. Please select from the dropdown menu and click \"Add to Order\" to add the item to the order. Click on the logo to return home.",
        "Menu Items",
        "Product",
        "Price",
        "Current Order",
        "Product",
        "Quantity",
        "Price",
        "Total Price",
        "Selected Item",
        "Add Item to Order",
        "Complete Order",
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


    var id_order = 0;
    
    var to_add = "howdy";
    const navigate = useNavigate();
    const [x, setX] = useState(false);
    // note to matt: modify this options -> with the items in the database just as you did with the table
    const dd_options = [
        'Steamed Juntunen', 'Spicy Santhanam', 'Fried Egholm', 'Baked Rehmat'
    ];
    
    var t = "";
    var mounted = false;
    useEffect(() => {
        if (mounted == false){
            getProduct();
            initValsTiny();
        }
        mounted = true;
    
    }, []); 
    var count = 0;
    let test;
    var current_order = [];
    var INITIAL_STATE = [];
    const [order, setOrder] = useState(current_order);
    const [products, setProducts] = useState(INITIAL_STATE)
    
    const getProduct = async (t)=> {
        console.log("started getproduct");  
        fetch('https://hssbackend.herokuapp.com/products')
        .then(res => res.json())
        .then(res => {   
            //console.log("About to get info from query");
                let newProducts = [ ...products];
                for (var i = 0; i < res.length; i++){
                    // res[i].description = translate(res[i].description, targetLanguage);
                    newProducts.push({id: i, name: res[i].description, price: "$" + String(res[i].price)});
                }
                setProducts(newProducts);
                
            
            //console.log("End of getProduct");

        })
        // translate all the text within the INITIAL_STATE ARRAYs name

        // for (let i = 0; i < INITIAL_STATE.length; i++) {
        //     INITIAL_STATE[i].name = await translate(INITIAL_STATE[i].name, targetLanguage);
        // }
        

        //console.log("x")
    }

    const add_to_order = () => {
        
        var desc = document.getElementById("selected_item").innerHTML;
        var item_price = (document.getElementById("selected_price").innerHTML);
        var quant = parseFloat(document.getElementById("quantfield").value);
        if (quant == 0){
            alert("Please enter a quantity.");
            return;
        }
        else if (quant < 0){
            alert("Please enter a positive quantity.");
            return;
        }
        else if (isNaN(quant)){
            alert("Please enter a valid quantity.");
            return;
        }
        let new_order = [ ...order];
        //get just the number from the price
        console.log("item_price1: " + item_price);
        item_price = parseFloat(item_price.substring(1));
        console.log("item_price: " + item_price);
        new_order.push({id: id_order, name: desc, quantity: quant, price: (parseFloat(item_price)*parseFloat(quant)).toFixed(2)});
        setOrder(new_order);
        id_order++;
        total_price = parseFloat(total_price) + parseFloat(quant * (item_price));
        total_price = total_price.toFixed(2);
        document.getElementById("total_price_div").innerHTML = "$" + String(total_price);
        
        completedOrder.push({name: desc, quantity: quant, price: (parseFloat(item_price)*parseFloat(quant)).toFixed(2)});
        
    }

    const queryOrder = () => {
        fetch ('https://hssbackend.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completedOrder)
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            //alert(data);
            getProduct();
        });
        //clear current order table
        let new_order = [ ...order];
        new_order = [];
        setOrder(new_order);
        total_price = 0.00;
        document.getElementById("total_price_div").innerHTML = "$" + "0.00";
        completedOrder = [];

    }

    const onClickAddItem = (name, price) => {
        // event.preventDefault();
        
        var div = document.getElementById("selected_item")
        div.innerHTML = name;
        var div2 = document.getElementById("selected_price")
        div2.innerHTML = String(price);
        //clear the quantity field
        

        //console.log(name, price)
    }

    const renderOrders = () =>{
        return order.map(({ id, name, quantity, price }) => { 
        

        return <tr key={id}>  
        <td >{name}</td>  
        <td>{quantity}</td>
        <td >${price}</td>   
     
        </tr>    


        }) 
    } 

    const renderProducts = () =>{

        return products.map(({ id, name, price }) => { 
        

        return <tr key={id} onClick={(event) => {onClickAddItem(name, price)}}>  
        
        <td >{name}</td>  
        <td >{price}</td>   
     
        </tr>    


        }) 
    } 

    const containerStyle = {
        // center both tables and make them display next to each other (flex row)
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: '100%',
    };

    //console.log("starting html");
    // getProduct(t);
    const[state, setState] = React.useState(INITIAL_STATE);
    return (
        <div>
        <img id="mainlogo3" style={{cursor: 'pointer'}} src={require('./components/img/hss_transparent.png')} onClick={()=>navigate('/')}  alt="Logo"></img>
        <div className="textbut1">
            {translatedTextList[0]}
        </div>
        {/* {console.log("Website creation begun")} */}
        <div style={{ margin: '50px' }}>
        </div>
        {/* The strings that we pull for query functions */}
        <div id="test_query_string" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
        <div id="test_query_string1" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
        <div className="tablecontainer" style={containerStyle}>
                <div id="tablediv">
                    <table className="table_s" > 
                        <thead>
                            <tr>
                            <th colSpan="2">{translatedTextList[1]}</th>
                            </tr>
                            <tr > 
                            <th>{translatedTextList[2]}</th>  
                            <th>{translatedTextList[3]}</th> 
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
                            <th colSpan="3">{translatedTextList[4]}</th>
                            </tr>
                            <tr > 
                            <th>{translatedTextList[5]}</th>  
                            <th>{translatedTextList[6]}</th> 
                            <th>{translatedTextList[7]}</th>
                            </tr>  
                        </thead>    
                        <tbody> 
                        {renderOrders()}
                        </tbody>  
                        <td colSpan="2" style={{fontWeight: 'bold', textAlign: 'center'}}>{translatedTextList[8]}</td>
                        <td id="total_price_div">$0.00</td>
                    </table>
                    
                </div>

                <div className="addtoorder">
                    {/* <Dropdown className="dropdown" options={dd_options} placeholder="Select an option" /> */}
                    <text id="order" className="order">{translatedTextList[9]}</text>
                    <div id="selected_item" className="order">{}</div>
                    <div id="selected_price" className="order">{}</div>
                    <input id="quantfield" placeholder={translatedTextList[12]}></input>
                    <button className="addtoorderbutton" onClick={add_to_order}>{translatedTextList[10]}</button>
                    <br></br><button className="addtoorderbutton" onClick={queryOrder}>{translatedTextList[11]}</button>
                </div>
                
        </div>

        {/* <div className="homebutton" id="add_product"  >Add to Order</div> */}

        </div>  
    );

};
export default Customer;