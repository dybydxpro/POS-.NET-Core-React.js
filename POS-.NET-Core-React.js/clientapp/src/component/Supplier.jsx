import React, { useEffect, useState } from "react";
import Services from "../Services";
import { Button, Modal } from 'react-bootstrap';

import SlideBar from "./SlideBar";

export default function Supplier(){
    const [data, setData] = useState([{
        "supplierID": 0,
        "supplierName": "",
        "address": "",
        "contactNumber": ""
    }]);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
    },[]);

    function fetchData(){
        Services.GetAllSuppliers().then(({data})=>{
            setData(data)
        })
    }

    function SearchText(e){
        const search = e.target.value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.GetSearchSuppliers(search).then(({data})=>{
                setData(data)
            })
        }
    }

    function printTable(){
        return(
            data.map(dataset =>
                <tr key={dataset.supplierID}>
                    <td>{dataset.supplierID}</td>
                    <td>{dataset.supplierName}</td>
                    <td>{dataset.address}</td>
                    <td>{dataset.contactNumber}</td>
                    <td>
                        <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneSupplier(dataset.supplierID);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Supplier</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="supplierName" value={editSupplier.supplierName} onChange={(e) => handleEdit(e)} placeholder="TS Company"/>
                                        <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="address" value={editSupplier.address} onChange={(e) => handleEdit(e)} placeholder="Main Road, Gampaha."/>
                                        <label htmlFor="address" className="form-label">Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="contactNumber" value={editSupplier.contactNumber} onChange={(e) => handleEdit(e)} placeholder="+94#########"/>
                                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => EditSupplier()}>
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

    function AddSupplierValidate(){
        const newData = {...addNew};
        if(newData["supplierName"] === "" || newData["supplierName"] === undefined){
            console.log("supplierName");
            return false;
        }
        else if(newData["address"] === "" || newData["address"] === undefined){
            console.log("address");
            return false;
        }
        else if(newData["contactNumber"] === "" || newData["contactNumber"] === undefined){
            console.log("contactNumber");
            return false;
        }
        else{
            return true;
        }
    }

    function AddSupplier(){
        if(AddSupplierValidate()){
            Services.PostSupplier(addNew)
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
    const [editSupplier, setEditSupplier] = useState({
        "supplierID": 0,
        "supplierName": "",
        "address": "",
        "contactNumber": ""
    });

    function handleEdit(e){
        const newData = {...editSupplier};
        newData[e.target.id] = e.target.value;
        setEditSupplier(newData);
        console.log(newData);
    }

    function GetOneSupplier(id){
        Services.GetOneSupplier(id)
        .then(({data}) =>{
            console.log(data);
            setEditSupplier(data);
        }).catch(({response})=>{
            console.log(response);
            alert(response);
        })     
    }

    function EditSupplierValidate(){
        const newData = {...editSupplier};
        if(newData["supplierName"] === "" || newData["supplierName"] === undefined){
            console.log("supplierName");
            return false;
        }
        else if(newData["address"] === "" || newData["address"] === undefined){
            console.log("address");
            return false;
        }
        else if(newData["contactNumber"] === "" || newData["contactNumber"] === undefined){
            console.log("contactNumber");
            return false;
        }
        else{
            return true;
        }
    }

    function EditSupplier(){
        if(EditSupplierValidate()){
            Services.EditSupplier(editSupplier)
            .then(({data}) =>{
                console.log(data);
                setEditSupplier({"supplierID": 0, "supplierName": "", "address": "", "contactNumber": ""});
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
                                <li className="breadcrumb-item active" aria-current="page">Supplier</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-1">List of Suppliers</p>
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
                                        <th scope="col">Supplier Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Contact Number</th>
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
                                <input type="text" className="form-control" id="supplierName" onChange={(e) => handleAdd(e)} placeholder="TS Company"/>
                                <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="address" onChange={(e) => handleAdd(e)} placeholder="Main Road, Gampaha."/>
                                <label htmlFor="address" className="form-label">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="contactNumber" onChange={(e) => handleAdd(e)} placeholder="+94#########"/>
                                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                            </div>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => AddSupplier()}>
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