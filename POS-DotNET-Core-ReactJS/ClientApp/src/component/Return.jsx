import React, { useEffect, useState } from "react";
import Services from "../Services";
import Common from "../services/common";
import { Button, Modal } from 'react-bootstrap';

import SlideBar from "./SlideBar";

export default function Return(){
    const [data, setData] = useState([{
        "returnID": 0,
        "billID": 0,
        "itemID": 0,
        "itemName": "",
        "unit": "",
        "stockID": 0,
        "qty": 0.00,
        "price": 0.00,
        "returnerID": 0,
        "returnerName": ""
    }]);
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

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
        fetchItem();
    },[]);

    function fetchData(){
        Services.GetAllReturns().then(({data})=>{
            setData(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    function fetchItem(){
        Services.GetAllItemsASC().then(({data})=>{
            setItem(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    function fetchStock(e){
        Services.GetAllStocksASC(e.target.value).then(({data})=>{
            setStock(data);
            console.log(data);
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    function SearchText(e){
        const search = e.target.value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.GetSearchReturn(search).then(({data})=>{
                setData(data)
            })
            .catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
            })
        }
    }

    function deleteItem(id){
        if(window.confirm("Confirm to delete!")===true){
            Services.DeleteReturn(id).then(({data})=>{
                fetchData();
                console.log(data);
            })
            .catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
            })
        }
    }

    function printTable(){
        return(
            data.map(dataset =>
                <tr key={dataset.returnID}>
                    <td>{dataset.returnID}</td>
                    <td>{dataset.billID}</td>
                    <td>{dataset.itemID}</td>
                    <td>{dataset.stockID}</td>
                    <td>{dataset.itemName}</td>
                    <td>{dataset.unit}</td>
                    <td>{dataset.qty}</td>
                    <td>{dataset.price}</td>
                    <td>{dataset.returnerName}</td>
                    <td>
                    <button type="button" className="btn btn-danger mx-2" onClick={()=> deleteItem(dataset.returnID)}><i className="bi bi-trash"></i>&nbsp; Delete</button>
                        {/*<button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneItems(dataset.returnID);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="billID" value={editItem.billID} onChange={(e) => handleEdit(e)} placeholder="0" min={1}/>
                                        <label htmlFor="billID" className="form-label">Bill ID</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="itemID" value={editItem.itemID} onChange={(e) => {handleEdit(e); fetchStock(e);}} placeholder="NOS">
                                            <option value="" selected>_</option>
                                            {
                                                item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                            }
                                        </select>
                                        <label htmlFor="itemID" className="form-label">Item</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="stockID" value={editItem.stockID} onChange={(e) => handleEdit(e)} placeholder="NOS">
                                            <option value="" selected>_</option>
                                            {
                                                stock.map(stocks => <option key={stocks.stockID} value={stocks.stockID}>{stocks.price}</option>)
                                            }
                                        </select>
                                        <label htmlFor="stockID" className="form-label">Stock</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="qty" value={editItem.qty} onChange={(e) => handleEdit(e)} placeholder="0" min={1}/>
                                        <label htmlFor="qty" className="form-label">Qty</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="price" value={editItem.price} onChange={(e) => handleEdit(e)} placeholder="0" min={1}/>
                                        <label htmlFor="price" className="form-label">Price</label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => EditItem()}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={EditModelHandleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>*/}
                    </td>
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
        newData["returnerID"] = sessionStorage.getItem("userID");
        setAddNew(newData);
        console.log(newData);
    }

    function AddItemValidate(){
        const newData = {...addNew};
        if(newData["billID"] === "" || newData["billID"] === undefined){
            console.log("billID");
            return false;
        }
        else if(newData["itemID"] === "" || newData["itemID"] === undefined){
            console.log("itemID");
            return false;
        }
        else if(newData["stockID"] === "" || newData["stockID"] === undefined){
            console.log("stockID");
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

    function AddItem(){
        if(AddItemValidate()){
            Services.PostReturn(addNew)
            .then(({data}) =>{
                console.log(data);
                fetchData();
                AddModelHandleClose();
                setAddNew({});
            }).catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }
        
    }

    //Edit Model
    const [editModel, setEditModel] = useState(false);

    const EditModelHandleClose = () => setEditModel(false);
    const EditModelHandleShow = () => setEditModel(true);

    //Edit User
    const [editItem, setEditItem] = useState({
        "itemID": 0,
        "itemName": "",
        "unit": ""
    });

    function handleEdit(e){
        const newData = {...editItem};
        newData[e.target.id] = e.target.value;
        setEditItem(newData);
        console.log(newData);
    }

    function GetOneItems(id){
        Services.GetOneItem(id)
        .then(({data}) =>{
            console.log(data);
            setEditItem(data);
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })     
    }

    function EditItemValidate(){
        const newData = {...editItem};
        if(newData["itemName"] === "" || newData["itemName"] === undefined){
            console.log("itemName");
            return false;
        }
        else if(newData["unit"] === "" || newData["unit"] === undefined){
            console.log("unit");
            return false;
        }
        else{
            return true;
        }
    }

    function EditItem(){
        if(EditItemValidate()){
            Services.EditReturn(editItem)
            .then(({data}) =>{
                console.log(data);
                EditItem({"userID": 0, "itemName": "", "unit": ""});
                fetchData();
                EditModelHandleClose();
            }).catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
                alert(response);
            })     
        }
        else{
            alert("Validation Failed!")
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
                                <li className="breadcrumb-item active" aria-current="page">Return</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-1">List of Returns</p>
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
                                        <th scope="col">Return #</th>
                                        <th scope="col">Bill ID</th>
                                        <th scope="col">ItemID</th>
                                        <th scope="col">StockID</th>
                                        <th scope="col">ItemName</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">ReturnerName</th>
                                        <th scope="col" style={{ width: "150px" }}>Options</th>
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
                        <Modal.Title>Add Return</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="billID" onChange={(e) => handleAdd(e)} placeholder="0" min={1}/>
                                <label htmlFor="billID" className="form-label">Bill ID</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="itemID" onChange={(e) => {handleAdd(e); fetchStock(e);}} placeholder="NOS">
                                    <option value="" selected>_</option>
                                    {
                                        item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                    }
                                </select>
                                <label htmlFor="itemID" className="form-label">Item</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="stockID" onChange={(e) => handleAdd(e)} placeholder="NOS">
                                    <option value="" selected>_</option>
                                    {
                                        stock.map(stocks => <option key={stocks.stockID} value={stocks.stockID}>{stocks.price}</option>)
                                    }
                                </select>
                                <label htmlFor="stockID" className="form-label">Stock</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="qty" onChange={(e) => handleAdd(e)} placeholder="0" min={1}/>
                                <label htmlFor="qty" className="form-label">Qty</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="price" onChange={(e) => handleAdd(e)} placeholder="0" min={1}/>
                                <label htmlFor="price" className="form-label">Price</label>
                            </div>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => AddItem()}>
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