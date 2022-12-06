// view orders and inventory
// @rishisant

import React, {useState, useEffect} from 'react';//import './BaseStyle.css';
import './ManagerStyle.css';
import {raise_admin_bar} from './HomeFunctions';
import './TableStyle.css';
import { print_All_Vals, products, ingredients, prices } from './Server';
import { initVals } from './Home';
import {useNavigate} from 'react-router-dom';
import {translate} from './HomeFunctions';
import './BaseStyle.css';
import { functionalUpdate } from 'react-table';

var menuLoaded = false;
var invLoaded = false;
const EditProducts = () => {
    const currentLang = localStorage.getItem('lang', 'en');
    //console.log('currentLang: ' + currentLang);
    const targetLanguage = currentLang;
    const textList = [
        "Click on the period of time you would like to view orders for by selecting an option from the dropdown menu. The inventory can be viewed by clicking on the inventory button.",
        "View Orders", //2
        "View Inventory", //3
        "Today", //4 
        "Since Last Week", //5 
        "Since Last Month", //6
        "Since Last Year", //7
        "All Time", //8
        "Load Table", //9
        "All Orders",   //10
        "Products", //11
        "Order ID", //12
        "Price", //13
        "Date", //14
        "Inventory", //15
        "Items", //16
        "Stock", //17
        "Quantity", //18
        "Ingredients", //19
        "ID", //20
        "Name", //21
        "Catagory", //22
        "Menu", //23
        "Edit Price", //23
        "Edit Name", //24
        "Edit Catagory", //25
        "Edit Ingredients", //26
        "Edit Stock", //27
        "ID of Product to Edit", //28
        "Edit Product", //29
        "Delete Product", //30
        "Add Product", //31
        "Add Ingredient", //32
        "Set ID", //33
        "Set Name", //34
        "Set Stock", //35
        "Delete Ingredient", //36
        "Edit Ingredient", //37
        "ID of Ingredient to Edit", //38
        "Set Price", //39
        "Set Catagory", //40
        "Set Ingredients", //41




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
    var IS_menu = [];
    var IS_inv = [];
    const [menu, setMenu] = useState(IS_menu);
    const [inv, setInv] = useState(IS_inv);
    var mounted = false;
    useEffect(() => {
        if (mounted == false){
            initVals();
            getInv();
            getMenu();
            //putProduct();
            //deleteProduct();
        }
        mounted = true;
        
    }, []);
    //get inventory
    const getInv = async () => {
        fetch('https://hssbackend.herokuapp.com/get_inv') 
        .then(response => response.json())
        .then(data => {
            let newInv = [ ...inv];
            //console.log("here");
            for (let i = 0; i < data.length; i++) {
                newInv.push({id: i, inv_id: data[i].ing_id, name: data[i].name, stock: data[i].quantity});
                //onsole.log(data[i].name);
            }
            setInv(newInv);
        })
        //console.log(IS_inv);
    }
    
    const getMenu = async () => {
        fetch('https://hssbackend.herokuapp.com/get_menu')
        .then(response => response.json())
        .then(data => {
            let newMenu = [ ...menu];
            for (let i = 0; i < data.length; i++) {
                //display ingredients as comma separated list
                let ingred = "";
                for (let j = 0; j < data[i].ing_id.length; j++) {
                    ingred += data[i].ing_id[j];
                    if (j != data[i].ing_id.length - 1) {
                        ingred += ", ";
                    }
                }
                //display category where 1 = entree, 2 = side, 3 = drink
                let cat = "";
                if (data[i].cat_id == 1) {
                    cat = "Entree";
                } else if (data[i].cat_id == 2) {
                    cat = "Side";
                } else if (data[i].cat_id == 3) {
                    cat = "Drink";
                }
                

                newMenu.push({id: i, product_id: data[i].product_id, name: data[i].description, category: cat, price: data[i].price, ing: ingred});
            }
            setMenu(newMenu);
            
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

    const containerStyle = {
        // center both tables and make them display next to each other (flex row)
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'top',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: '100%',
    };

    
    //render the inventory table
    const renderInventory = () =>{
        return inv.map(({ id, inv_id, name, stock }) => {
        return <tr key={id} onClick={(event) => {onClickEditInv(inv_id, name, stock)}}>
            <td>{inv_id}</td>
            <td>{name}</td>
            <td>{stock}</td>
        </tr>
        });
    }
    const onClickEditMenu = (product_id, name, category, price, ing) => {
        //populate the edit menu form with the current values
        document.getElementById("product_id").value = product_id;
        document.getElementById("editname").value = name;
        document.getElementById("editcategory").value = category;
        document.getElementById("editprice").value = price;
        document.getElementById("editingredients").value = ing;
        
    }
    const onClickEditInv = (inv_id, name, stock) => {
        //populate the edit inventory form with the current values
        document.getElementById("editInv_id").value = inv_id;
        document.getElementById("editInv_name").value = name;
        document.getElementById("editInv_stock").value = stock;
    }


    const putProduct = async () => {
        //get the values from the edit menu form
        let product_id = document.getElementById("product_id").value;
        let name = document.getElementById("editname").value;
        //let category = document.getElementById("editcategory").value;
        let price = document.getElementById("editprice").value;
        //let ing = document.getElementById("editingredients").value;
        //send the values to the backend
        console.log(price);
        console.log(product_id);
        console.log(name);
        //convert category to number
        let category = 0;
        if (document.getElementById("editcategory").value == "Entree") {
            category = 1;
        } else if (document.getElementById("editcategory").value == "Side") {
            category = 2;
        } else if (document.getElementById("editcategory").value == "Drink") {
            category = 3;
        }
        //convert ingredients to array
        let ing1 = document.getElementById("editingredients").value.split(",");
        for (let i = 0; i < ing1.length; i++) {
            ing1[i] = ing1[i].trim();
        }
        console.log(category);
        //send the values to the backend

        fetch('hhttps://hssbackend.herokuapp.com/put_product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: product_id,
                name: name,
                category: category,
                price: price,
                ing: ing1,
            }),
        })
        .then(response => {
            return response.text()
            })
        .then(data => {
            console.log("data", data);
            getMenu();
            
        })
        //update the menu table
        
        //clear the edit menu form
        document.getElementById("product_id").value = "";
        document.getElementById("editname").value = "";
        document.getElementById("editcategory").value = "";
        document.getElementById("editprice").value = "";
        document.getElementById("editingredients").value = "";
    
        console.log("done");
    }
    //q: where is the json.parse error coming from?
    //a: the backend is sending a string, not a json object

    const deleteProduct = async () => {
        
        let product_id = document.getElementById("product_id").value;
        //send the values to the backend
        console.log(product_id);
        fetch('https://hssbackend.herokuapp.com/delete_product', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                product_id: product_id,
            }),
        })
        .then(response => {
            return response.text()
            })
        .then(data => {
            console.log(data);
        })
        //update the menu table
        getMenu();
    }

    const postProduct = async () => {
        //get the values from the edit menu form
        let id = document.getElementById("addproduct_id").value;
        let name = document.getElementById("addname").value;
        let category = document.getElementById("addcategory").value;
        let price = document.getElementById("addprice").value;
        let ing = document.getElementById("addingredients").value;
        let stock = document.getElementById("addstock").value;
        //convert category to number
        let category1 = 0;
        if (category == "Entree") {
            category1 = 1;
        }
        else if (category == "Side") {

            category1 = 2;
        }
        else if (category == "Drink") {
                
            category1 = 3;
        }
        //convert ingredients to array
        let ing1 = ing.split(",");
        for (let i = 0; i < ing1.length; i++) {
            ing1[i] = ing1[i].trim();
        }

        //send the values to the backend
        fetch('https://hssbackend.herokuapp.com/post_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: id,
                name: name,
                category: category1,
                price: price,
                ing: ing1,
                stock: stock,
            }),
        })
        .then(response => {
            return response.text()
            }
        )
        .then(data => {
            console.log(data);
        }
        )
        //update the menu table
        getMenu();
        //clear the edit menu form
        document.getElementById("addproduct_id").value = "";
        document.getElementById("addname").value = "";
        document.getElementById("addcategory").value = "";
        document.getElementById("addprice").value = "";
        document.getElementById("addingredients").value = "";
        document.getElementById("addstock").value = "";



    }

    const addInv = async () => {
        //get the values from the edit menu form
        let id = document.getElementById("addInv_id").value;
        let stock = document.getElementById("addInv_stock").value;
        let name = document.getElementById("addInv_name").value;
        //send the values to the backend
        fetch('https://hssbackend.herokuapp.com/post_inv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inv_id: id,
                stock: stock,
                name: name,
            }),
        })
        .then(response => {
            return response.text()
            }
        )
        .then(data => {
            console.log(data);
        }
        )
        //update the menu table
        getInv();
        //clear the edit menu form
        document.getElementById("addInv_id").value = "";
        document.getElementById("addInv_stock").value = "";
        document.getElementById("addInv_name").value = "";

    }

    const putInv = async () => {
        //get the values from the edit menu form
        let id = document.getElementById("editInv_id").value;
        let stock = document.getElementById("editInv_stock").value;
        let name = document.getElementById("editInv_name").value;
        //send the values to the backend
        fetch('https://hssbackend.herokuapp.com/put_inv', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inv_id: id,
                stock: stock,
                name: name,
            }),
        })
        .then(response => {
            return response.text()
            }
        )
        .then(data => {
            console.log(data);
        }
        )
        //update the menu table
        getInv();
        //clear the edit menu form
        document.getElementById("editInv_id").value = "";
        document.getElementById("editInv_stock").value = "";
        document.getElementById("editInv_name").value = "";

    }


    const deleteInv = async () => {
        let inv_id = document.getElementById("editInv_id").value;
        //send the values to the backend
        console.log(inv_id);
        fetch('https://hssbackend.herokuapp.com/delete_inv', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inv_id: inv_id,
            }),
        })
        .then(response => {
            return response.text()
            })
        .then(data => {
            console.log(data);
        })
        //update the menu table
        getInv();
        document.getElementById("editInv_id").value = "";
        document.getElementById("editInv_stock").value = "";
        document.getElementById("editInv_name").value = "";
    }

    

    //render the menu table
    const renderMenu = () =>{
        return menu.map(({ id, product_id, name, category, price, ing }) => {
        return <tr key={id} onClick={(event) => {onClickEditMenu(product_id, name, category, price, ing)}}>
            <td>{product_id}</td>
            <td>{name}</td>
            <td>{category}</td>
            <td>${price}</td>
            <td>{ing}</td>
        </tr>
        });
    }
    const[menuTable,setTable] = useState([ <table></table>])
    const[invTable,setInvTable] = useState([ <table></table>])
    const[menuBut, setMenuBut] = useState([<div></div>])
    const[invBut, setInvBut] = useState([<div></div>])

    const loadTables = () => {
        //get value of dropdown menu
        var x = document.getElementById("menuorinventory").value;
        //if the value is 1, then display the menu table
        console.log(x);
        if (x == "menu") {
            if(menuLoaded == false){
                //display text boxes and buttons for menu table
                setMenuBut([<div>
                    <div className="tablebuttons" id="editAndDeleteProduct">
                        <input id="product_id" type="text"  placeholder={translatedTextList[28]}>{}</input>
                        <input id="editname" placeholder={translatedTextList[24]} size="25">{}</input>
                        <input id="editcategory" placeholder={translatedTextList[25]} size="25">{}</input>
                        <input id="editprice" placeholder={translatedTextList[23]} size="25">{}</input>
                        <input id="editingredients" placeholder={translatedTextList[26]} size="25">{}</input>
                        <button id="editmenu" onClick={putProduct}>{translatedTextList[29]}</button>
                        <button id="addmenu" onClick={deleteProduct}>{translatedTextList[30]}</button>
                    
                    </div>
                    <div className="tablebuttons" id="addProduct">
                        <input id="addproduct_id" placeholder={translatedTextList[33]}>{}</input>
                        <input id="addname" placeholder={translatedTextList[34]} size="25">{}</input>
                        <input id="addcategory" placeholder={translatedTextList[40]} size="25">{}</input>
                        <input id="addprice" placeholder={translatedTextList[39]} size="25">{}</input>
                        <input id="addingredients" placeholder={translatedTextList[41]} size="25">{}</input>
                        <input id="addstock" placeholder={translatedTextList[35]} size="25">{}</input>
                        <button id="addmenu" onClick={postProduct}>{translatedTextList[31]}</button>

                    </div>
                </div>])

                //remove the inventory table if it is displayed
                setInvTable([<table></table>]);
                setInvBut([<div></div>]);
                setTable([<table className="table_s" width="1000">
                    <tr>
                    <th colSpan="5">{translatedTextList[22]}</th>
                    </tr>
                    <tr>
                        <th>{translatedTextList[19]}</th>
                        <th>{translatedTextList[20]}</th>
                        <th>{translatedTextList[21]}</th>
                        <th>{translatedTextList[12]}</th>
                        <th>{translatedTextList[18]}</th>
                    </tr>
                    {renderMenu()}
                </table>]);
            }
            menuLoaded = true;
            invLoaded = false;
        }
        //if the value is 2, then display the inventory table
        else if (x == "inventory") {
            if(invLoaded == false){
                //remove the menu table if it is displayed
                setInvBut([<div>
                    <div className="tablebuttons" id="editAndDeleteInv">
                        <input id="editInv_id" type="text"  placeholder={translatedTextList[38]}>{}</input>
                        <input id="editInv_name" placeholder={translatedTextList[24]} size="25">{}</input>
                        <input id="editInv_stock" placeholder={translatedTextList[27]} size="25">{}</input>
                        <button id="editinv" onClick={putInv}>{translatedTextList[37]}</button>
                        <button id="deleteinv" onClick={deleteInv}>{translatedTextList[36]}</button>
                    </div>
                    <div className="tablebuttons" id="addInventory">
                        <input id="addInv_id" placeholder={translatedTextList[33]}>{}</input>
                        <input id="addInv_name" placeholder={translatedTextList[34]} size="25">{}</input>
                        <input id="addInv_stock" placeholder={translatedTextList[35]} size="25">{}</input>
                        <button id="addinv" onClick={addInv}>{translatedTextList[32]}</button>
                    </div>
                </div>])
                setTable([<table></table>]);
                setMenuBut([<div></div>]);
                setInvTable([<table className="table_s" >
                    <tr>
                        <th colSpan="3">{translatedTextList[14]}</th>
                        </tr>
                    <tr>
                        <th>{translatedTextList[19]}</th>
                        <th>{translatedTextList[20]}</th>
                        <th>{translatedTextList[16]}</th>
                    </tr>
                    {renderInventory()}
                </table>]);
            }
            invLoaded = true;
            menuLoaded = false;
        }

    }


//insert command for product table
//insert into product (product_id, name, description, stock, cat_id, price, ing_id) values (100, 'Chicken', 'Chicken', 1, 1, 1.99, '{1, 2, 3}');
    const navigate = useNavigate();
    return (
        <div>
          <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} style={{cursor: 'pointer'}} onClick={()=> navigate('/Manager')} alt="Logo"></img>
                <div className="textbut1">
                {translatedTextList[0]}
                </div>
                
                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>

                <select id="menuorinventory" style={dropdownStyle}>
                    <option value="menu">{translatedTextList[22]}</option>
                    <option value="inventory">{translatedTextList[14]}</option>
                </select>

                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>
                
                <div class="homebutton" id="load_order_request" onClick={loadTables}>{translatedTextList[8]}</div>
                {/* <div class="homebutton" id="loadtable" onClick={menuLoad}>Load Table</div> */}
                <div id="spacer" style={{marginBottom: '5px', visibility: 'hidden'}}>ss</div>
                <div>
                    {menuBut}
                    {invBut}
                </div>

                 <div id="tablecontainers" style={containerStyle}>
                    <div id="tablebuttons">

                        <div id="tablediv">
                        {menuTable}
                        </div>
                    </div>
                    <div id="tablebuttons">
                        <div id="tablediv">
                        {invTable}
                        </div>     
                    </div>              
                
                </div>
                

        </div>
    );
}

export default EditProducts;