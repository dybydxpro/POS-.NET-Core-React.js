import React, { useEffect, useState, useRef } from "react";
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import { Button, Modal } from 'react-bootstrap';

export default function Item(){
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([{
        "itemID": 0,
        "itemName": "",
        "unit": ""
    }]);

    const refItemName = useRef<HTMLInputElement>(null);
    const refUnit = useRef<HTMLSelectElement>(null);

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
            if(e.target.id === 'itemName'){
                refUnit.current?.focus();
            }
            else if(e.target.id === 'unit'){
                AddItem();
            }
        }
    }

    function fetchData(){
        Services.GetAllItems().then(({data})=>{
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
            Services.GetSearchItems(search).then(({data})=>{
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
                <tr key={dataset.itemID}>
                    <td>{index+((currentPage-1)*recordsPerPage)+1}</td>
                    <td>{dataset.itemID}</td>
                    <td>{dataset.itemName}</td>
                    <td>{dataset.unit}</td>
                    <td>
                        <button type="button" className="btn btnPrimaryS mx-2" onClick={()=>{EditModelHandleShow(); GetOneItems(dataset.itemID);}}><i className="bi bi-pencil"></i>&nbsp; Edit</button>
                        <Modal show={editModel} onHide={EditModelHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="itemName" value={editItem.itemName} onChange={(e) => handleEdit(e.target.id, e.target.value)} placeholder="Tile Addisive"/>
                                        <label htmlFor="itemName" className="form-label">Item Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="unit" value={editItem.unit} onChange={(e) => handleEdit(e.target.id, e.target.value)}>
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

    function handleAdd(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddItemValidate(){
        const newData: any = {...addNew};
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
    const [editItem, setEditItem] = useState({
        "itemID": "",
        "itemName": "",
        "unit": ""
    });

    function handleEdit(id: string, value: string){
        const newData: any = {...editItem};
        newData[id] = value;
        setEditItem(newData);
        console.log(newData);
    }

    function GetOneItems(id: number){
        Services.GetOneItem(id)
        .then(({data}) =>{
            console.log(data);
            setEditItem(data);
        }).catch(({response})=>{
            responseManage(response);
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
                EditItem();
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
                <p className="m-4" style={{ color: "#03053B", fontSize: "18px", fontWeight: "600" }}>Items</p>
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
                            <button type="button" className="btn btnPrimary" onClick={() => { AddModelHandleShow(); setTimeout(() =>{ refItemName.current?.focus() }, 1000); }}><i className="bi bi-plus"></i> &nbsp; Add item</button>
                        </div>
                    </div>

                    <div>
                        <div className="my-2">
                            <table className="table">
                                <thead className="theadStyle">
                                    <tr>
                                        <th scope="col" className="text-light text-center">#</th>
                                        <th scope="col" className="text-light text-center">Item ID</th>
                                        <th scope="col" className="text-light text-center">Item Name</th>
                                        <th scope="col" className="text-light text-center">Unit</th>
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
                    {/* <button type="button" className="btn text-light" style={{position:"fixed", width:"60px", height:"60px", bottom:"40px", right:"40px", borderRadius: "50%", backgroundColor: "#2e856e", fontSize:"28px"}} onClick={AddModelHandleShow}>
                        <i className="bi bi-plus"></i>
                    </button> */}
                    <Modal show={addModel} onHide={AddModelHandleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="form" onKeyPress={(e)=> keyRep(e)} >
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="itemName" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="Tile Addisive" ref={refItemName}/>
                                    <label htmlFor="itemName" className="form-label">Item Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="unit" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="NOS" ref={refUnit}>
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
        </>
    );
}