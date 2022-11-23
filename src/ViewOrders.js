

import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
import './ManagerStyle.css';
import {raise_admin_bar} from './HomeFunctions';
import './TableStyle.css';
import { print_All_Vals, products, ingredients, prices } from './Server';

function ViewOrders (){
    //print_All_Vals();
    //console.log(products, prices);

    const [product, setProduct] = useState(false);
    var INITIAL_STATE= [];
    const [users, setUsers] = useState(INITIAL_STATE)
    const renderProducts = () => {      
        for (var i = 0; i < products.length; i++) {
            INITIAL_STATE.push({id: i, name: products[i], price: prices[i]});
        }
        return users.map(({ id, name, price }) => {
        return <tr key={id}>
        <td >{name}</td>
        <td >{price}</td>
        </tr>
        })
    }
    
    return  (
        <div>
            {/* <div class="homebutton" id="admin_panel" onClick={print_All_Vals}>Print all vals Console</div> */}
        {console.log("Website creation begun")}
        <div style={{ margin: '50px' }}>
        </div>
        {/* The strings that we pull for query functions */}
        <div id="test_query_string" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
        <div id="test_query_string1" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
        
        <table className="table_s">
            <thead>
                <tr> 
                <th>Product</th>  
                <th>Price</th>   
                </tr>  
            </thead>
            <tbody>
            {renderProducts()}   
            {}
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>Ingredients</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
        </table>
        <div style = {{color: 'white'}}> Howdy</div>
        </div>
        
    );   
    
};
export default ViewOrders;  
//q: how do i reload an external page?
//a: https://stackoverflow.com/questions/36904185/react-router-v4-reloading-current-route

