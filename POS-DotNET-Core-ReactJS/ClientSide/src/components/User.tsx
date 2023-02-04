import React, {useEffect, useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";

export default function User(){
    const [data, setData] = useState([{
        "userID": 0,
        "name": "",
        "nic": "",
        "address": "",
        "userName": "",
        "type": "",
        "status": ""
    }]);

    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const refName = useRef<HTMLInputElement>(null);
    const refNIC = useRef<HTMLInputElement>(null);
    const refAddress = useRef<HTMLInputElement>(null);
    const refUserName = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const refType = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
            //navigate("/login");
        }

        if(sessionStorage.getItem("type") !== "Admin"){
            window.location.replace("/dashboard");
        }

        fetchData();
    },[]);

    /* Pagination */
    const indexOfLastRecord = Number(currentPage * recordsPerPage);
    const indexOfFirstRecord = Number(indexOfLastRecord - recordsPerPage);
    const numberOfPages = Math.ceil(data.length / recordsPerPage);
    const pageNumbers  = [...Array.from(Array(numberOfPages+1).keys())].slice(1); 
    const currentPosts = data.slice(indexOfFirstRecord, indexOfLastRecord);

    function nextPage(){
        if(currentPage !== numberOfPages){
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
        }
    }
    /* Pagination */

    function keyRep(e: any){
        if(e.key === 'Enter'){
            if(e.target.id === 'name'){
                refNIC.current?.focus();
            }
            else if(e.target.id === 'nic'){
                refAddress.current?.focus();
            }
            else if(e.target.id === 'address'){
                refUserName.current?.focus();
            }
            else if(e.target.id === 'userName'){
                refPassword.current?.focus();
            }
            else if(e.target.id === 'password'){
                refType.current?.focus();
            }
            else if(e.target.id === 'type'){
                AddUser();
            }
        }
    }

    async function fetchData(){
        Services.getAllUser().then(({data})=>{
            setData(data);
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })
    }

    function SearchText(search: string){
        if(search === ""){
            fetchData();
        }
        else{
            Services.SearchUser(search).then(({data})=>{
                setData(data)
            })
            .catch(({response})=>{
                responseManage(response);
                console.log(response);
            })
        }
    }

    function printTable(){
        return(
            currentPosts.map((dataset, index) =>
                <tr key={dataset.userID} className={ Boolean(dataset.status)===false? "table-secondary" : ""}>
                    <td><b>{index+((currentPage-1)*recordsPerPage)+1}</b></td>
                    <td>{dataset.userID}</td>
                    <td>{dataset.name}</td>
                    <td>{dataset.nic}</td>
                    <td>{dataset.address}</td>
                    <td>{dataset.userName}</td>
                    <td>{dataset.type}</td>
                    <td>
                        {/* <button type="button" className="btn btn-warning mx-2" onClick={()=>{EditModelHandleShow(); GetOneUser(dataset.userID);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button> */}
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="name" value={editUser.name} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="John Smidth"/>
                                        <label htmlFor="name" className="form-label">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="nic" value={editUser.nic} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="75XXXXXXXXV"/>
                                        <label htmlFor="nic" className="form-label">NIC</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="address" value={editUser.address} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="No 15, Temple Road, Malabe."/>
                                        <label htmlFor="address" className="form-label">Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="type" value={editUser.type} onChange={(e) => handleEdit(e.target.id, e.target.value)}>
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

                        {/* <button type="button" className="btn btn-info mx-2" onClick={()=>{ CpModelHandleShow(); handleCP("userID", String(dataset.userID)); }}><i className="bi bi-shield-lock"></i>&nbsp; Change Password</button> */}
                        <Modal show={cpModel} onHide={CpModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="pw" onChange={(e) => handleCP(e.target.id, e.target.value)} placeholder="John Smidth"/>
                                        <label htmlFor="pw" className="form-label">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="cpw" onChange={(e) => handleCP(e.target.id, e.target.value)} placeholder="75XXXXXXXXV"/>
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
                        {/* <button type="button" className="btn btn-secondary mx-2" onClick={()=>ActiveDeactiveAccount(dataset.userID)}><i className={Boolean(dataset.status)===false? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>&nbsp; {Boolean(dataset.status)===false? "Activate" : "Deactivate"}</button> */}
                        <div className="btn-group">
                            <button type="button" className="btn btnPrimaryS dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Options
                            </button>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={()=>{EditModelHandleShow(); GetOneUser(dataset.userID);}}><i className="bi bi-pencil"></i>&nbsp; Edit</li>
                                <li className="dropdown-item" onClick={()=>{ CpModelHandleShow(); handleCP("userID", String(dataset.userID)); }}><i className="bi bi-shield-lock"></i>&nbsp; Change Password</li>
                                <li className="dropdown-item" onClick={()=>ActiveDeactiveAccount(dataset.userID)}><i className={Boolean(dataset.status)===false? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>&nbsp; {Boolean(dataset.status)===false? "Activate" : "Deactivate"}</li>
                            </ul>
                        </div>
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

    function handleAdd(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddUserValidate(){
        const newData: any = {...addNew};
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
                responseManage(response);
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

    function handleEdit(id: string, value: string){
        const newData: any = {...editUser};
        newData[id] = value;
        setEditUser(newData);
        console.log(newData);
    }

    function GetOneUser(id: number){
        Services.getOneUser(id)
        .then(({data}) =>{
            console.log(data);
            setEditUser(data);
        }).catch(({response})=>{
            responseManage(response);
            console.log(response);
            alert(response);
        })     
    }

    function EditUserValidate(){
        const newData: any = {...editUser};
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
                responseManage(response);
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
        "userID": "",
        "pw": "",
        "cpw": "",
    });

    function handleCP(id: string, value: string){
        const newData: any = {...cp};
        newData[id] = value;
        setCp(newData);
        console.log(newData);
    }

    function CPValidate(){
        const newData: any = {...cp};
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
                    setCp({"userID": "0", "pw": "", "cpw": ""});
                    CpModelHandleClose();
                }).catch(({response})=>{
                    responseManage(response);
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

    function ActiveDeactiveAccount(id: number){
        if(window.confirm("Confirm to update status.")){
            Services.ADAccount(id)
            .then(({data}) =>{
                console.log(data);
                fetchData();
            }).catch(({response})=>{
                responseManage(response);
                console.log(response);
                alert(response);
            }) 
        }
    }

    return(
        <>
            <div className="row">
                <p className="m-4" style={{ color: "#03053B", fontSize: "18px", fontWeight: "600" }}>Users</p>
            </div>

            <div className="row mx-3">
                <div className="row">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="form-floating" style={{ minWidth: "300px" }}>
                                <input className="form-control" type="text" id="txtSearch" placeholder="Search" onChange={(e) => SearchText(e.target.value)}/>
                                <label htmlFor="txtSearch" className="form-label"><i className="bi bi-search text-secondary" /></label>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btnPrimary" onClick={()=> {AddModelHandleShow(); setTimeout(() =>{ refName.current?.focus() }, 1000);}}><i className="bi bi-plus"></i> &nbsp; Add user</button>
                        </div>
                    </div>

                    <div>
                        <div className="my-2">
                            <table className="table">
                                <thead className="theadStyle">
                                    <tr>
                                        <th scope="col" className="text-light text-center">#</th>
                                        <th scope="col" className="text-light text-center">UID</th>
                                        <th scope="col" className="text-light text-center">Name</th>
                                        <th scope="col" className="text-light text-center">NIC</th>
                                        <th scope="col" className="text-light text-center">Address</th>
                                        <th scope="col" className="text-light text-center">User Name</th>
                                        <th scope="col" className="text-light text-center">Type</th>
                                        <th scope="col" className="text-light text-center">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printTable()}
                                </tbody>
                            </table>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex" style={{ minWidth: "300px"}}>
                                        <label className="form-label mt-3" htmlFor="noOfRows">No of Rows:</label>
                                        <select className="form-select mx-3" id="noOfRows" onChange={(e) => setRecordsPerPage(Number(e.target.value))} style={{ maxWidth: "100px"}}>
                                            <option defaultValue="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="500">500</option>
                                            <option value="1000">1000</option>
                                        </select>
                                    </div>
                                    <div>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item" onClick={() => prevPage()}>
                                                    <div className="page-link txtPrimary" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </div>
                                                </li>
                                                {
                                                    pageNumbers.map((pg) => 
                                                        <li className="page-item" key={pg}><div className={currentPage==pg? "page-link btnPagination": "page-link txtPrimary"} onClick={() => setCurrentPage(pg)}>{pg}</div></li>
                                                    )
                                                }
                                                <li className="page-item" onClick={() => nextPage()}>
                                                    <div className="page-link txtPrimary" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* <button type="button" className="btn text-light" style={{position:"fixed", width:"60px", height:"60px", bottom:"40px", right:"40px", borderRadius: "50%", backgroundColor: "#2e856e", fontSize:"28px"}}>
                            <i className="bi bi-plus"></i>
                        </button> */}
                        <Modal show={addModel} onHide={AddModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div id="form" onKeyPress={(e)=> keyRep(e)} >
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="name" onChange={(e) => {handleAdd(e.target.id, e.target.value);}} placeholder="John Smidth" ref={refName}/>
                                        <label htmlFor="name" className="form-label">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="nic" onChange={(e) => {handleAdd(e.target.id, e.target.value);}} placeholder="75XXXXXXXXV" ref={refNIC}/>
                                        <label htmlFor="nic" className="form-label">NIC</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="address" onChange={(e) => {handleAdd(e.target.id, e.target.value);}} placeholder="No 15, Temple Road, Malabe." ref={refAddress}/>
                                        <label htmlFor="address" className="form-label">Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="userName" onChange={(e) => {handleAdd(e.target.id, e.target.value);}} placeholder="JohnS" ref={refUserName}/>
                                        <label htmlFor="userName" className="form-label">UserName</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="password" onChange={(e) => {handleAdd(e.target.id, e.target.value);}} placeholder="John Smidth" ref={refPassword}/>
                                        <label htmlFor="password" className="form-label">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="type" onChange={(e) => {handleAdd(e.target.id, e.target.value);}} ref={refType}>
                                            <option defaultValue="">_</option>
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
            </div>
        </>
    );
}