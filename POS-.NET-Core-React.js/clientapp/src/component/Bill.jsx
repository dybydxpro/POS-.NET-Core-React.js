import React, { useEffect, useState } from "react";
import Services from "../Services";
import { Button, Modal } from 'react-bootstrap';

import SlideBar from "./SlideBar";

export default function Bill(){
    const [data, setData] = useState([]);
    const [addNew, setAddNew] = useState({
        "itemID": 0,
        "stockID": 0,
        "cartQty": 0
    });
    const [item, setItem] = useState([{
        "itemID": 0,
        "itemName": "string",
        "unit": "string"
    }]);
    const [stock, setStock] = useState([{
        "stockID": 0,
        "itemID": 0,
        "itemName": "string",
        "unit": "string",
        "qty": 0,
        "price": 0
    }]);
    const [bill, setBill] = useState([{ }]);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
        fetchItem();
    },[]);

    function fetchData(){
        var id = sessionStorage.getItem("userID");
        Services.GetAllCart(id).then(({data})=>{
            console.log(data);
            setData(data)
        })
        .catch(({response})=>{
            console.log(response);
            setData([]);
        })
    }

    function fetchItem(){
        Services.GetAllItemsASC().then(({data})=>{
            setItem(data)
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    function fetchStock(e){
        Services.GetAllStocksASC(e.target.value).then(({data})=>{
            setStock(data);
            console.log(data);
        })
        .catch(({response})=>{
            console.log(response);
        })
    }

    //Process Bill
    function ProcessBill(){
        var id = sessionStorage.getItem("userID");
        Services.ProcessBill(id).then(({data})=>{
            console.log(data);
            fetchData();
        })
        .catch(({response})=>{
            console.log(response);
            fetchData();
        })
    }

    function printTable(){
        return(
            data.map((dt, index) => 
                <tr className="table" key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{dt.itemID}</td>
                    <td>{dt.stockID}</td>
                    <td>{dt.itemName}</td>
                    <td>{dt.unit}</td>
                    <td>{dt.cartQty}</td>
                    <td className="text-end">{parseFloat(dt.price).toFixed(2)}</td>
                    <td className="text-end">{parseFloat(dt.netPrice).toFixed(2)}</td>
                    <td>
                        {/*<button type="button" className="btn btn-warning mx-2"><i className="bi bi-pencil"></i>&nbsp;Edit</button>*/}
                        <button type="button" className="btn btn-danger mx-2" onClick={() => deleteItem(dt.cartID)}><i className="bi bi-trash"></i>&nbsp;Delete</button>

                    </td>
                </tr>
            )
        );
    }

    function totalOfPaybleBill(){
        var total = 0;
        for(var a = 0; a < data.length; ++a){
            total = total + Number(data[a].netPrice);
        }
        return total;
    }

    //Add New Item

    function handle(e){
        const newData = {...addNew};
        newData[e.target.id] = e.target.value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddNewValidate(){
        const newData = {...addNew};
        if(newData["itemID"] === "" || newData["itemID"] === undefined){
            console.log("itemID");
            return false;
        }
        else if(newData["stockID"] === "" || newData["stockID"] === undefined){
            console.log("stockID");
            return false;
        }
        else if(newData["cartQty"] === "" || newData["cartQty"] === undefined){
            console.log("cartQty");
            return false;
        }
        else{
            return true;
        }
    }

    function addnewItem(){
        var data = {
            "itemID": addNew.itemID,
            "stockID": addNew.stockID,
            "cartQty": addNew.cartQty,
            "price": 20,
            "sellerID": sessionStorage.getItem("userID")
        };
        setAddNew({
            "itemID": 0,
            "stockID": 0,
            "cartQty": 0
        });
        if(AddNewValidate() == true){
            Services.PostCart(data)
            .then(({data}) =>{
                console.log(data);
                fetchData();
                setAddNew({
                    "itemID": 0,
                    "stockID": 0,
                    "cartQty": 0
                });
            }).catch(({response})=>{
                console.log(response);
                setAddNew({
                    "itemID": 0,
                    "stockID": 0,
                    "cartQty": 0
                });
                alert(response);
            })
        }
        console.log(data);
    }

    function deleteItem(id){
        Services.DeleteCart(id)
        .then(({data}) =>{
            console.log(data);
            fetchData();
        }).catch(({response})=>{
            console.log(response);
            alert(response);
        })
    }


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-2" style={{backgroundColor: "#4d646f"}}>
                    <SlideBar/>
                </div>
                <div className="col">
                    <div className="" style={{ backgroundColor: "#cfd8dd" }}>
                        <nav>
                            <ol className="breadcrumb p-3">
                                <li className="breadcrumb-item" aria-current="page"><a href="/dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Bill</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-3">Bill System</p>
                        </div>

                        <div>
                            <button type="button" className="btn text-light" style={{position:"fixed", width:"60px", height:"60px", top:"90px", right:"40px", borderRadius: "50%", backgroundColor: "#2e856e", fontSize:"28px"}}>
                                <i className="bi bi-clipboard2-pulse"></i>
                            </button>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-4 shadow">
                                        <select className="form-select" id="itemID" value={addNew.itemID} onChange={(e) => {handle(e); fetchStock(e);}} placeholder="TXT">
                                            <option value="0" selected> </option>
                                            {item.map((items) =>
                                                <option key={items.itemID} value={items.itemID}>{items.itemName}</option>
                                            )}
                                        </select>
                                        <label className="form-label" htmlFor="itemID">Item</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4 shadow">
                                        <select className="form-select" id="stockID" value={addNew.stockID} onChange={(e) => handle(e)} placeholder="TXT">
                                            <option value="0" selected> </option>
                                            {stock.map((stocks) =>
                                                <option key={stocks.stockID} value={stocks.stockID}>{parseFloat(stocks.price).toFixed(2)}</option>
                                            )}
                                        </select>
                                        <label className="form-label" htmlFor="stockID">Stock (LKR.)</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-4 shadow">
                                        <input type="number" id="cartQty" className="form-control" value={addNew.cartQty} onChange={(e) => handle(e)} placeholder="TXT"/>
                                        <label className="form-label" htmlFor="cartQty">Qty</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="align-middle">
                                        <button className="btn btn-primary btn-lg shadow" onClick={() => addnewItem()} style={{height: "57px"}}><i className="bi bi-save"></i>&nbsp; Save</button>
                                    </div>
                                </div>
                            </div>                            

                            <div className="mx-2">
                                <hr />
                            </div>

                            <div className="my-2">
                                <table className="table">
                                    <thead>
                                        <tr className="bg-dark text-light">
                                            <th scope="col">#</th>
                                            <th scope="col">Item ID</th>
                                            <th scope="col">Stock ID</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Unit</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Net Price</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {printTable()}
                                    </tbody>
                                    <tfoot>
                                        <tr className="text-center table-active">
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col">Total (LKR.) :</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col" className="text-end">{ parseFloat(totalOfPaybleBill()).toFixed(2) }</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="d-flex justify-content-end mx-2">
                                <button className="btn py-3 px-4" onClick={() => ProcessBill()} style={{ backgroundColor: "#337AB7", color: "white", fontSize: "20px" }}><i className="bi bi-receipt"></i>&nbsp;Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}