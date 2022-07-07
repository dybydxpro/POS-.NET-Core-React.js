import React, { useEffect, useState } from "react";
import Services from "../Services";
import { Button, Modal } from 'react-bootstrap';

import SlideBar from "./SlideBar";

export default function Stock(){
    const [data, setData] = useState([{
        "stockID": 0,
        "itemID": 0,
        "itemName": "",
        "unit": "",
        "qty": 0.00,
        "price": 0.00
    }]);
    const [item, setItem] = useState([{
        "itemID": 0,
        "itemName": "",
        "unit": ""
    }]);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
    },[]);

    function fetchData(){
        Services.GetAllStocks().then(({data})=>{
            setData(data);
        })

        Services.GetAllItems().then(({data})=>{
            setItem(data);
        })
    }

    function SearchText(e){
        const search = e.target.value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.GetSearchStocks(search).then(({data})=>{
                setData(data)
            })
        }
    }

    function printTable(){
        return(
            data.map(dataset =>
                <tr key={dataset.stockID}>
                    <td>{dataset.stockID}</td>
                    <td>{dataset.itemID}</td>
                    <td>{dataset.itemName}</td>
                    <td>{dataset.unit}</td>
                    <td className="text-end">{dataset.qty}</td>
                    <td className="text-end">{dataset.price}</td>
                </tr>
            )
        );
    }

        //Add Model
        const [addModel, setAddModel] = useState(false);

        const AddModelHandleClose = () => setAddModel(false);
        const AddModelHandleShow = () => setAddModel(true);
    
        //Add New
        const [addNew, setAddNew] = useState({});
    
        function handleAdd(e){
            const newData = {...addNew};
            newData[e.target.id] = e.target.value;
            setAddNew(newData);
            console.log(newData);
        }
    
        function AddStockValidate(){
            const newData = {...addNew};
            if(newData["itemID"] === "" || newData["itemID"] === undefined){
                console.log("itemID");
                return false;
            }
            else if(newData["qty"] === "" || newData["qty"] === undefined){
                console.log("qty");
                return false;
            }
            else if(newData["price"] === "" || newData["price"] === undefined){
                console.log("price");
                return false;
            }
            else{
                return true;
            }
        }
    
        function AddStock(){
            if(AddStockValidate()){
                Services.PostStock(addNew)
                .then(({data}) =>{
                    console.log(data);
                    fetchData();
                    AddModelHandleClose();
                    setAddNew({});
                }).catch(({response})=>{
                    console.log(response);
                    alert(response);
                })
            }
            else{
                alert("Validation Failed!");
            }
            
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
                                <li className="breadcrumb-item active" aria-current="page">Stock</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-1">List of Stocks</p>
                        </div>

                        <div className="d-flex justify-content-end container">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="search" placeholder="Search" onChange={(e) => SearchText(e)}/>
                                <label htmlFor="search"><i className="bi bi-search"></i>&nbsp; Search</label>
                            </div>
                        </div>

                        <div className="shadow-sm p-3 mb-5 bg-body rounded container">
                            <table className="table">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">#</th>
                                        <th scope="col">Item #</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col" className="text-center">Qty</th>
                                        <th scope="col" className="text-center">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <button type="button" className="btn text-light" style={{position:"fixed", width:"60px", height:"60px", bottom:"40px", right:"40px", borderRadius: "50%", backgroundColor: "#2e856e", fontSize:"28px"}} onClick={AddModelHandleShow}>
                    <i className="bi bi-plus"></i>
                </button>
                <Modal show={addModel} onHide={AddModelHandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="itemID" onChange={(e) => handleAdd(e)} placeholder="Item">
                                    <option value="" selected>_</option>
                                    {
                                        item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                    }
                                </select>
                                <label htmlFor="itemID" className="form-label">Item Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="qty" onChange={(e) => handleAdd(e)} placeholder="0.00"/>
                                <label htmlFor="qty" className="form-label">Qty</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="price" onChange={(e) => handleAdd(e)} placeholder="0.00"/>
                                <label htmlFor="price" className="form-label">Unit Price</label>
                            </div>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => AddStock()}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={AddModelHandleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}