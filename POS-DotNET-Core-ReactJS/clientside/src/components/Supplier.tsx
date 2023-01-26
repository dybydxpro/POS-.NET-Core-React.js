import React, { useEffect, useState, useRef} from "react";
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import { Button, Modal } from 'react-bootstrap';

export default function Supplier(){
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [data, setData] = useState([{
        "supplierID": 0,
        "supplierName": "",
        "address": "",
        "contactNumber": ""
    }]);

    const refSuplierName = useRef<HTMLInputElement>(null);
    const refAddress = useRef<HTMLInputElement>(null);
    const refContactNumber = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
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
            if(e.target.id === 'supplierName'){
                refAddress.current?.focus();
            }
            else if(e.target.id === 'address'){
                refContactNumber.current?.focus();
            }
            else if(e.target.id === 'contactNumber'){
                AddSupplier();
            }
        }
    }

    function fetchData(){
        Services.GetAllSuppliers().then(({data})=>{
            setData(data)
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })
    }

    function SearchText(value: string){
        const search = value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.GetSearchSuppliers(search).then(({data})=>{
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
                <tr key={dataset.supplierID}>
                    <td>{index+((currentPage-1)*recordsPerPage)+1}</td>
                    <td>{dataset.supplierID}</td>
                    <td>{dataset.supplierName}</td>
                    <td>{dataset.address}</td>
                    <td>{dataset.contactNumber}</td>
                    <td>
                        <button type="button" className="btn btnPrimaryS mx-2" onClick={()=>{EditModelHandleShow(); GetOneSupplier(dataset.supplierID);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Supplier</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div id="form" onKeyPress={(e)=> keyRep(e)}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="supplierName" value={editSupplier.supplierName} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="TS Company"/>
                                        <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="address" value={editSupplier.address} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="Main Road, Gampaha."/>
                                        <label htmlFor="address" className="form-label">Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="contactNumber" value={editSupplier.contactNumber} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="+94#########"/>
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

    function handleAdd(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddSupplierValidate(){
        const newData: any = {...addNew};
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
    const [editSupplier, setEditSupplier] = useState({
        "supplierID": 0,
        "supplierName": "",
        "address": "",
        "contactNumber": ""
    });

    function handleEdit(id: string, value: string){
        const newData: any = {...editSupplier};
        newData[id] = value;
        setEditSupplier(newData);
        console.log(newData);
    }

    function GetOneSupplier(id: number){
        Services.GetOneSupplier(id)
        .then(({data}) =>{
            console.log(data);
            setEditSupplier(data);
        }).catch(({response})=>{
            responseManage(response);
            console.log(response);
            alert(response);
        })     
    }

    function EditSupplierValidate(){
        const newData: any = {...editSupplier};
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
                responseManage(response);
                console.log(response);
                alert(response);
            })     
        }
        else{
            alert("Validation Failed!")
        }
    }

    return(
        <>
            <div className="row">
                <p className="m-4" style={{ color: "#03053B", fontSize: "18px", fontWeight: "600" }}>Suppliers</p>
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
                            <button type="button" className="btn btnPrimary" onClick={() => {AddModelHandleShow(); setTimeout(() =>{ refSuplierName.current?.focus() }, 1000);}}><i className="bi bi-plus"></i> &nbsp; Add Supplier</button>
                        </div>
                    </div>

                    <div>
                        <div className="my-2">
                            <table className="table">
                                <thead className="theadStyle">
                                    <tr className="">
                                        <th scope="col" className="text-light text-center">#</th>
                                        <th scope="col" className="text-light text-center">Supplier ID</th>
                                        <th scope="col" className="text-light text-center">Supplier Name</th>
                                        <th scope="col" className="text-light text-center">Address</th>
                                        <th scope="col" className="text-light text-center">Contact Number</th>
                                        <th scope="col" className="text-light text-center" style={{ width: "150px" }}>Options</th>
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
                </div>

                <div>
                    <Modal show={addModel} onHide={AddModelHandleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Supplier</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="form" onKeyPress={(e)=> keyRep(e)}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="supplierName" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="TS Company" ref={refSuplierName}/>
                                    <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="address" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="Main Road, Gampaha." ref={refAddress}/>
                                    <label htmlFor="address" className="form-label">Address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="contactNumber" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="+94#########" ref={refContactNumber}/>
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
        </>
    );
}