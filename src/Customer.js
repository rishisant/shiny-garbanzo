import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './BaseStyle.css';
// import {raise_admin_bar} from './HomeFunctions';
import {raise_admin_bar} from './HomeFunctions';
import {products, prices, ingredients, print_All_Vals} from './Home';

const Customer = () => {
    const navigate = useNavigate();
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
            
        <div id="homecontainer">
        <img id="mainlogo" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>
            
        </div>
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

        

export default Customer;