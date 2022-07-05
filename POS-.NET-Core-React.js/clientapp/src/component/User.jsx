import React, { useEffect, useState } from "react";
//import { useNavigate } from 'react-router-dom';
import Services from "../Services";
import { Button, Modal } from 'react-bootstrap';

import SlideBar from "./SlideBar";

export default function User(){
    //const navigate = useNavigate();
    const [data, setData] = useState([{
        "userID": 0,
        "name": "",
        "nic": "",
        "address": "",
        "userName": "",
        "type": "",
        "status": ""
    }]);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
            //navigate("/login");
        }

        fetchData();
    },[]);

    function fetchData(){
        Services.getAllUser().then(({data})=>{
            setData(data)
        })
    }

    function SearchText(e){
        const search = e.target.value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.SearchUser(search).then(({data})=>{
                setData(data)
            })
        }
    }

    function printTable(){
        return(
            data.map(dataset =>
                <tr key={dataset.userID} className={ dataset.status===false? "table-secondary" : ""}>
                    <td>{dataset.userID}</td>
                    <td>{dataset.name}</td>
                    <td>{dataset.nic}</td>
                    <td>{dataset.address}</td>
                    <td>{dataset.userName}</td>
                    <td>{dataset.type}</td>
                    <td>
                        <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneUser(dataset.userID);}}>Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="name" value={editUser.name} onChange={(e) => handleEdit(e)} placeholder="John Smidth"/>
                                        <label htmlFor="name" className="form-label">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="nic" value={editUser.nic} onChange={(e) => handleEdit(e)} placeholder="75XXXXXXXXV"/>
                                        <label htmlFor="nic" className="form-label">NIC</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="address" value={editUser.address} onChange={(e) => handleEdit(e)} placeholder="No 15, Temple Road, Malabe."/>
                                        <label htmlFor="address" className="form-label">Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="type" value={editUser.type} onChange={(e) => handleEdit(e)}>
                                            <option value="" selected>_</option>
                                            <option value="Cashier">Cashier</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                        <label htmlFor="type" className="form-label">Type</label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => EditUser()}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={EditModelHandleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <button type="button" className="btn btn-info mx-2" onClick={()=>{CpModelHandleShow(); setCp({"userID": dataset.userID});}}>Change Password</button>
                        <Modal show={cpModel} onHide={CpModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="pw" onChange={(e) => handleCP(e)} placeholder="John Smidth"/>
                                        <label htmlFor="pw" className="form-label">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="cpw" onChange={(e) => handleCP(e)} placeholder="75XXXXXXXXV"/>
                                        <label htmlFor="cpw" className="form-label">Confirm Password</label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => changePassword()}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={CpModelHandleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <button type="button" className="btn btn-secondary mx-2" onClick={()=>ActiveDeactiveAccount(dataset.userID)}>{dataset.status===false? "Activate" : "Deactivate"}</button>

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

    function AddUserValidate(){
        const newData = {...addNew};
        if(newData["name"] === "" || newData["name"] === undefined){
            console.log("name");
            return false;
        }
        else if(newData["nic"] === "" || newData["nic"] === undefined){
            console.log("nic");
            return false;
        }
        else if(newData["address"] === "" || newData["address"] === undefined){
            console.log("address");
            return false;
        }
        else if(newData["userName"] === "" || newData["userName"] === undefined){
            console.log("userName");
            return false;
        }
        else if(newData["password"] === "" || newData["password"] === undefined){
            console.log("password");
            return false;
        }
        else if(newData["type"] === "" || newData["type"] === undefined){
            console.log("type");
            return false;
        }
        else{
            return true;
        }
    }

    function AddUser(){
        if(AddUserValidate()){
            Services.CreateUser(addNew)
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
    const [editUser, setEditUser] = useState({
        "userID": 0,
        "name": "",
        "nic": "",
        "address": "",
        "type": ""
    });

    function handleEdit(e){
        const newData = {...editUser};
        newData[e.target.id] = e.target.value;
        setEditUser(newData);
        console.log(newData);
    }

    function GetOneUser(id){
        Services.getOneUser(id)
        .then(({data}) =>{
            console.log(data);
            setEditUser(data);
        }).catch(({response})=>{
            console.log(response);
            alert(response);
        })     
    }

    function EditUserValidate(){
        const newData = {...editUser};
        if(newData["name"] === "" || newData["name"] === undefined){
            console.log("name");
            return false;
        }
        else if(newData["nic"] === "" || newData["nic"] === undefined){
            console.log("nic");
            return false;
        }
        else if(newData["address"] === "" || newData["address"] === undefined){
            console.log("address");
            return false;
        }
        else if(newData["type"] === "" || newData["type"] === undefined){
            console.log("type");
            return false;
        }
        else{
            return true;
        }
    }

    function EditUser(){
        if(EditUserValidate()){
            Services.EditUser(editUser)
            .then(({data}) =>{
                console.log(data);
                setEditUser({"userID": 0, "name": "", "nic": "", "address": "", "type": ""});
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

    //Change Password Model
    const [cpModel, setCpModel] = useState(false);

    const CpModelHandleClose = () => setCpModel(false);
    const CpModelHandleShow = () => setCpModel(true);

    //Change Password
    const [cp, setCp] = useState({
        "userID": 0,
        "pw": "",
        "cpw": "",
    });

    function handleCP(e){
        const newData = {...cp};
        newData[e.target.id] = e.target.value;
        setCp(newData);
        console.log(newData);
    }

    function CPValidate(){
        const newData = {...cp};
        if(newData["userID"] === "" || newData["userID"] === undefined){
            console.log("userID");
            return false;
        }
        else if(newData["pw"] === "" || newData["pw"] === undefined){
            console.log("pw");
            return false;
        }
        else if(newData["cpw"] === "" || newData["cpw"] === undefined){
            console.log("cpw");
            return false;
        }
        else{
            return true;
        }
    }

    function changePassword(){
        if(CPValidate()){
            var query = {userID: cp.userID, password: cp.pw};
            console.log(query);
            if(cp.pw === cp.cpw){
                Services.ResetPW(query)
                .then(({data}) =>{
                    console.log(data);
                    setCp({"userID": 0, "pw": "", "cpw": ""});
                    CpModelHandleClose();
                }).catch(({response})=>{
                    console.log(response);
                    alert(response);
                })  
            }
            else{
                alert("Password Confirmation Failed!");
            }
        }
        else{
            alert("Validation Failed!");
        }
    }

    //Active Deactive Account

    function ActiveDeactiveAccount(id){
        if(window.confirm("Confirm to update status.")){
            Services.ADAccount(id)
            .then(({data}) =>{
                console.log(data);
                fetchData();
            }).catch(({response})=>{
                console.log(response);
                alert(response);
            }) 
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
                                <li className="breadcrumb-item active" aria-current="page">User</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-4">List of Users</p>
                        </div>

                        <div class="d-flex justify-content-end container">
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="search" placeholder="Search" onChange={(e) => SearchText(e)}/>
                                <label for="search">Search</label>
                            </div>
                        </div>

                        <div className="shadow-sm p-3 mb-5 bg-body rounded container">
                            <table className="table">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">NIC</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">UserName</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Options</th>
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
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" onChange={(e) => handleAdd(e)} placeholder="John Smidth"/>
                                <label htmlFor="name" className="form-label">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="nic" onChange={(e) => handleAdd(e)} placeholder="75XXXXXXXXV"/>
                                <label htmlFor="nic" className="form-label">NIC</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="address" onChange={(e) => handleAdd(e)} placeholder="No 15, Temple Road, Malabe."/>
                                <label htmlFor="address" className="form-label">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="userName" onChange={(e) => handleAdd(e)} placeholder="JohnS"/>
                                <label htmlFor="userName" className="form-label">UserName</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="password" onChange={(e) => handleAdd(e)} placeholder="John Smidth"/>
                                <label htmlFor="password" className="form-label">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" id="type" onChange={(e) => handleAdd(e)}>
                                    <option value="" selected>_</option>
                                    <option value="Cashier">Cashier</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <label htmlFor="type" className="form-label">Type</label>
                            </div>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => AddUser()}>
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