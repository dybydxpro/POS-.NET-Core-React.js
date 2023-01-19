import React, { useEffect, useState, useRef} from "react";
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import { Button, Modal } from 'react-bootstrap';

export default function Return(){
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

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

    const refSuplierName = useRef<HTMLInputElement>(null);
    const refAddress = useRef<HTMLInputElement>(null);
    const refContactNumber = useRef<HTMLInputElement>(null);
    const refSuplierName = useRef<HTMLInputElement>(null);
    const refAddress = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
        fetchItem();
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

    function fetchData(){
        Services.GetAllReturns().then(({data})=>{
            setData(data)
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })
    }

    function fetchItem(){
        Services.GetAllItemsASC().then(({data})=>{
            setItem(data)
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })
    }

    function fetchStock(e: any){
        Services.GetAllStocksASC(e.target.value).then(({data})=>{
            setStock(data);
            console.log(data);
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
            Services.GetSearchReturn(search).then(({data})=>{
                setData(data)
            })
            .catch(({response})=>{
                responseManage(response);
                console.log(response);
            })
        }
    }

    function deleteItem(id: number){
        if(window.confirm("Confirm to delete!")===true){
            Services.DeleteReturn(id).then(({data})=>{
                fetchData();
                console.log(data);
            })
            .catch(({response})=>{
                responseManage(response);
                console.log(response);
            })
        }
    }

    function printTable(){
        return(
            data.map((dataset, index) =>
                <tr key={dataset.returnID}>
                    <td>{index+((currentPage-1)*recordsPerPage)+1}</td>
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

    function handleAdd(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        newData["returnerID"] = sessionStorage.getItem("userID");
        setAddNew(newData);
        console.log(newData);
    }

    function AddItemValidate(){
        const newData: any = {...addNew};
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
        "itemID": 0,
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
        const newData: any = {...editItem};
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
                <p className="m-4" style={{ color: "#4d646f", fontSize: "18px", fontWeight: "600" }}>Suppliers</p>
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
                            <button type="button" className="btn btnPrimary" onClick={AddModelHandleShow}><i className="bi bi-plus"></i> &nbsp; Add Supplier</button>
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
                            <Modal.Title>Add Return</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="billID" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0" min={1}/>
                                    <label htmlFor="billID" className="form-label">Bill ID</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="itemID" onChange={(e) => {handleAdd(e.target.id, e.target.value); fetchStock(e);}} placeholder="NOS">
                                        <option value="" selected>_</option>
                                        {
                                            item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                        }
                                    </select>
                                    <label htmlFor="itemID" className="form-label">Item</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="stockID" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="NOS">
                                        <option value="" selected>_</option>
                                        {
                                            stock.map(stocks => <option key={stocks.stockID} value={stocks.stockID}>{stocks.price}</option>)
                                        }
                                    </select>
                                    <label htmlFor="stockID" className="form-label">Stock</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="qty" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0" min={1}/>
                                    <label htmlFor="qty" className="form-label">Qty</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="price" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0" min={1}/>
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
        </>
    );
}