import React, { useEffect, useState, useRef} from "react";
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import { Button, Modal } from 'react-bootstrap';

export default function Stock(){
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

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

    const refItemName = useRef<HTMLSelectElement>(null);
    const refQty = useRef<HTMLInputElement>(null);
    const refUnitPrice = useRef<HTMLInputElement>(null);

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
            if(e.target.id === 'itemID'){
                refQty.current?.focus();
            }
            else if(e.target.id === 'qty'){
                refUnitPrice.current?.focus();
            }
            else if(e.target.id === 'price'){
                AddStock();
            }
        }
    }

    function fetchData(){
        Services.GetAllStocks().then(({data})=>{
            setData(data);
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })

        Services.GetAllItems().then(({data})=>{
            setItem(data);
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
            Services.GetSearchStocks(search).then(({data})=>{
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
                <tr key={dataset.stockID}>
                    <td>{index+((currentPage-1)*recordsPerPage)+1}</td>
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
    
    function handleAdd(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        setAddNew(newData);
        console.log(newData);
    }
    
    function AddStockValidate(){
        const newData: any = {...addNew};
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
                responseManage(response);
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }    
    }

    return(
        <>
            <div className="row">
                <p className="m-4" style={{ color: "#4d646f", fontSize: "18px", fontWeight: "600" }}>Stocks</p>
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
                            <button type="button" className="btn btnPrimary" onClick={() => { AddModelHandleShow(); setTimeout(() =>{ refItemName.current?.focus() }, 1000);} }><i className="bi bi-plus"></i> &nbsp; Add Stock</button>
                        </div>
                    </div>

                    <div>
                        <div className="my-2">
                            <table className="table">
                                <thead className="theadStyle">
                                    <tr className="">
                                        <th scope="col" className="text-light text-center">#</th>
                                        <th scope="col" className="text-light text-center">Stock ID</th>
                                        <th scope="col" className="text-light text-center">Item ID</th>
                                        <th scope="col" className="text-light text-center">Item Name</th>
                                        <th scope="col" className="text-light text-center">Unit</th>
                                        <th scope="col" className="text-light text-center">Qty</th>
                                        <th scope="col" className="text-light text-center">Price</th>
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
                            <Modal.Title>Add Stock</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="form" onKeyPress={(e)=> keyRep(e)} >
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="itemID" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="Item" ref={refItemName}>
                                        <option defaultValue="">_</option>
                                        {
                                            item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                        }
                                    </select>
                                    <label htmlFor="itemID" className="form-label">Item Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="qty" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0.00"  ref={refQty}/>
                                    <label htmlFor="qty" className="form-label">Qty</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="price" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0.00" ref={refUnitPrice}/>
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
        </>
    );
}