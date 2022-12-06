import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
import './ManagerStyle.css';
import './TableStyle.css';
import {useNavigate} from 'react-router-dom';
import {raise_admin_bar} from './HomeFunctions';

import { useRowSelect, useTable } from 'react-table';

function CreateOrder ({par}){
    const navigate = useNavigate();
    const [x, setX] = useState(false);
    
    var t = "";
    useEffect(() => {
        getProduct();
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
    console.log("starting html");
    // getProduct(t);
    const[state, setState] = React.useState(INITIAL_STATE);
    return (
        <div>
        {/* {console.log("Website creation begun")} */}
        <div style={{ margin: '50px' }}>
        </div>
        {/* The strings that we pull for query functions */}
        <div id="test_query_string" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
        <div id="test_query_string1" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
        <div>
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

        <div className="homebutton" id="add_product"  >Add to Order</div>

        </div>  
    );

};
export default CreateOrder;

// import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
// import './ManagerStyle.css';
// import './TableStyle.css';
// import {useNavigate} from 'react-router-dom';
// import {raise_admin_bar} from './HomeFunctions';

// import { useRowSelect, useTable } from 'react-table';
// var test = "Test Query1";
// let query_string = "";
// var d = ["pizza", "burger", "fries", "soda", "ice cream", "salad"];
// var p = [8, 9, 10, 11, 12, 13];
// var orders = [];
// var row_id = 0;
// var string  = "p";
// function ViewOrders (){
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(false);
//     var t = "";
//     useEffect(() => {
//         getProduct();
//     }, []); 
//     var count = 0;
//     var INITIAL_STATE = [
//         {id: 1, name: "Pizza" , price: 10},
//         {id: 2, name: "Burger", price: 5},  
//         {id: 3, name: "Fries", price: 2},
//         {id: 4, name: "Soda", price: 1}, 
//         {id: 5, name: "Ice Cream", price: 3},
//         {id: 6, name: "Salad", price: 4},  
//     ];
//     const [users, setUsers] = useState(INITIAL_STATE)
//     function read_products(){
//         //console.log("getting product in array");
//         var pstring = document.getElementById("test_query_string").innerHTML;
//         d = pstring.split(" | ");
//        /// console.log("Description " + d);
//     }
//     function read_price(){
 
//         //console.log("getting price in array");
//         var pstring1 = document.getElementById("test_query_string1").innerHTML;
//         p = pstring1.split(" | ");   
//        // console.log("Price: "+ p);
//     }
//     const getProduct = (t)=> {
//         console.log("started getproduct");  
//         fetch('http://localhost:3001')
//         .then(res => res.json())
//         .then(res => {   
//             //console.log("About to get info from query");
//             test = res[0].description;
//             for (t in res) { 
//                 if(count == 0){
//                     document.getElementById("test_query_string").innerHTML += res[t].description + " | ";
//                     document.getElementById("test_query_string1").innerHTML += res[t].price + " | ";
//                     d.push(res[t].description);
//                     p.push(res[t].price);
//                 }         
//             }
//             // for (var i = 0; i < d.length; i++) {  
//             //     INITIAL_STATE.push({id: i, name: d[i], price: p[i]});
//             // }  
//             count ++;
//             // if (count  == 1){   
//             //     //console.log("if statement for creation of arrays");
//             //     read_products();  
//             //     read_price(); 
//             //     for (var i = 0; i < d.length; i++) {  
//             //         INITIAL_STATE.push({id1: i, name: d[i], price: p[i]}); 
//             //     }
//             //     //console.log("Initial State: " + INITIAL_STATE);
//             // }
//             // console.log(p);
//             // console.log(d);
//             console.log("End of getProduct");
            
//         })
//     }
    
    
//     function checkFlag() { 
//         if(p.length < 1 || d.length < 1) {
//             console.log("wait");
//            window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
//         } else { 
//           return;
//         }
//     }  
    
 
//     const renderProducts = () =>{
//         console.log("render products");
//         ////var wait = await getProduct();
//         //setTimeout(() => console.log(JSON.stringify(p)), 6000);
//         //checkFlag();
//         //getProduct();
//         //console.log("waited");
//         // console.log("price: " + p);  
//         // console.log("description: " + d);
//         return users.map(({ id1, name, price }) => { 
//         {console.log("mapped")}   
             
//         return <tr key={id1} >  
//         <td >{name}</td>  
//         <td >{price}</td>   
//         {/* {console.log("rendered products")}   
//         {console.log("row_id: " + row_id)} 
//         {row_id++}  */}
//         </tr>    
        
           
//         }) 
//     } 
//     console.log("starting html");
//     getProduct(t);
//     const[state, setState] = React.useState(INITIAL_STATE);
//     return (
//         <div>
//         {/* {console.log("Website creation begun")} */}
//         <div style={{ margin: '50px' }}>
//         </div>
//         {/* The strings that we pull for query functions */}
//         <div id="test_query_string" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
//         <div id="test_query_string1" style={{visibility: 'hidden', fontSize: '0.1px' }}></div>
//         <div>
//         <table className="table_s" > 
//             <thead>
//                 <tr > 
//                 <th>Product</th>  
//                 <th>Price</th> 
//                 </tr>  
//             </thead>    
//             <tbody> 
//             {/* {state.map((item) => ( 
//                 <tr key={item.id}>
//                     {Object.values(item).map((val) => (
//                         <td>{val}</td>
//                     ))}
//                 </tr>
//             ))} */}
    
//             {renderProducts()}    
//             </tbody>  
//         </table>
//         </div>  
        
//         <div className="homebutton" id="add_product"  >Add to Order</div>

//         </div>  
//     );
      
// };
// export default ViewOrders;
