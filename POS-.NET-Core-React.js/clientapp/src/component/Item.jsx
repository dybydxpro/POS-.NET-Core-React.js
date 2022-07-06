import React, { useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom';
import Services from "../Services";
import { Button, Modal } from 'react-bootstrap';

import SlideBar from "./SlideBar";

export default function Item(){
    const [data, setData] = useState([{
        "itemID": 0,
        "itemName": "",
        "unit": ""
    }]);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
            //navigate("/login");
        }

        fetchData();
    },[]);

    function fetchData(){
        Services.GetAllItems().then(({data})=>{
            setData(data)
        })
    }

    function SearchText(e){
        const search = e.target.value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.GetSearchItems(search).then(({data})=>{
                setData(data)
            })
        }
    }

    function printTable(){
        return(
            data.map(dataset =>
                <tr key={dataset.itemID}>
                    <td>{dataset.itemID}</td>
                    <td>{dataset.itemName}</td>
                    <td>{dataset.unit}</td>
                    <td>
                        <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneItems(dataset.itemID);}}>Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="itemName" value={editItem.itemName} onChange={(e) => handleEdit(e)} placeholder="Tile Addisive"/>
                                        <label htmlFor="itemName" className="form-label">Item Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="unit" value={editItem.unit} onChange={(e) => handleEdit(e)}>
                                            <option value="" selected>_</option>
                                            <option value="NOS">NOS</option>
                                            <option value="KG">KG</option>
                                            <option value="BAG">BAG</option>
                                            <option value="LITER">LITER</option>
                                            <option value="MITER">MITER</option>
                                            <option value="BOTTLE">BOTTLE</option>
                                        </select>
                                        <label htmlFor="unit" className="form-label">Unit</label>
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
                        </Modal>
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
        setAddNew(newData);
        console.log(newData);
    }

    function AddItemValidate(){
        const newData = {...addNew};
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

    function AddItem(){
        if(AddItemValidate()){
            Services.PostItem(addNew)
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
            Services.EditItem(editItem)
            .then(({data}) =>{
                console.log(data);
                EditItem({"userID": 0, "itemName": "", "unit": ""});
                fetchData();
                EditModelHandleClose();
            }).catch(({response})=>{
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
                                <li className="breadcrumb-item active" aria-current="page">Item</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-4">List of Items</p>
                        </div>

                        <div className="d-flex justify-content-end container">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="search" placeholder="Search" onChange={(e) => SearchText(e)}/>
                                <label htmlFor="search">Search</label>
                            </div>
                        </div>

                        <div className="shadow-sm p-3 mb-5 bg-body rounded container">
                            <table className="table">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">#</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Unit</th>
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
                        <Modal.Title>Add Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="itemName" onChange={(e) => handleAdd(e)} placeholder="Tile Addisive"/>
                                <label htmlFor="itemName" className="form-label">Item Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="unit" onChange={(e) => handleAdd(e)} placeholder="NOS">
                                            <option value="" selected>_</option>
                                            <option value="NOS">NOS</option>
                                            <option value="KG">KG</option>
                                            <option value="BAG">BAG</option>
                                            <option value="LITER">LITER</option>
                                            <option value="MITER">MITER</option>
                                            <option value="BOTTLE">BOTTLE</option>
                                        </select>
                                <label htmlFor="unit" className="form-label">Unit</label>
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