import React, {useEffect, useState, useRef} from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import * as images from '../assets/image/images';

import { BillType } from "../models/Bill";

export default function Bill(){
    const [data, setData] = useState([{
        "cartID": 0,
        "itemID": 0,
        "stockID": 0,
        "itemName": "",
        "unit": "",
        "price": 0,
        "cartQty": 0,
        "netPrice": 0,
        "sellerID": 0
      }]);
    const [addNew, setAddNew] = useState({
        "itemID": 0,
        "stockID": 0,
        "cartQty": 1
    });
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
    const [bill, setBill] = useState([{
        "cartID": 0,
        "billNo": 0,
        "itemID": 0,
        "stockID": 0,
        "itemName": "",
        "unit": "",
        "price": 0,
        "soldQty": 0,
        "soldPrice": 0,
        "sellerID": 0,
        "userName": "",
        "timescape": ""
    }]);
    const [ppbtn, setPpbtn] = useState(0);
    const [allBillData, setAllBillData] = useState([{
        "billNo": 0,
        "timescape": "2000-01-01T00:00:00.000",
        "itemCount": 0,
        "billPrice": 0
    }]);

    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const refItemID = useRef<HTMLSelectElement>(null);
    const refStockID = useRef<HTMLSelectElement>(null);
    const refCartQty = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        setTimeout(() =>{
            refItemID.current?.focus();
        }, 1000);

        fetchData();
        fetchItem();
        fetchAllBill();
    },[]);

    /* Pagination */
    const indexOfLastRecord = Number(currentPage * recordsPerPage);
    const indexOfFirstRecord = Number(indexOfLastRecord - recordsPerPage);
    const numberOfPages = Math.ceil(allBillData.length / recordsPerPage);
    const pageNumbers  = [...Array.from(Array(numberOfPages+1).keys())].slice(1); 
    const currentPosts = allBillData.slice(indexOfFirstRecord, indexOfLastRecord);
    
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
                refStockID.current?.focus();
            }
            else if(e.target.id === 'stockID'){
                refCartQty.current?.focus();
            }
            else if(e.target.id === 'cartQty'){
                addnewItem();
                refStockID.current?.focus();
            }
        }
    }

    function fetchAllBill(){
        Services.FetchAllBills().then(({data})=>{
            setAllBillData(data)
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })
    }

    function fetchData(){
        var id = Number(sessionStorage.getItem("userID"));
        Services.GetAllCart(id).then(({data})=>{
            console.log(data);
            setData(data)
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
            setData([]);
        })
    }

    function SearchText(value: string){
        const search = value;
        console.log(search);
        if(search === ""){
            fetchAllBill();
        }
        else{
            Services.FetchSearchBills(search).then(({data})=>{
                setAllBillData(data)
            })
            .catch(({response})=>{
                responseManage(response);
                console.log(response);
            })
        }
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

    function fetchStock(value: number){
        Services.GetAllStocksASC(value).then(({data})=>{
            setStock(data);
            console.log(data);
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
        })
    }

    //Process Bill
    function ProcessBill(){
        var id = Number(sessionStorage.getItem("userID"));
        Services.ProcessBill(id).then(({data})=>{
            console.log(data);
            fetchData();
            fetchBillData(Number(data));
        })
        .catch(({response})=>{
            responseManage(response);
            console.log(response);
            fetchData();
        })
    }

    function printTable(){
        return(
            data.map((dt: any, index) => 
                <tr className="table" key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{dt.itemID}</td>
                    <td>{dt.stockID}</td>
                    <td>{dt.itemName}</td>
                    <td>{dt.unit}</td>
                    <td>{dt.cartQty}</td>
                    <td className="text-end">{parseFloat(dt.price).toFixed(2)}</td>
                    <td className="text-end">{parseFloat(dt.netPrice).toFixed(2)}</td>
                    <td className="text-center">
                        <button type="button" className="btn btn-danger mx-2" onClick={() => deleteItem(dt.cartID)}><i className="bi bi-trash"></i>&nbsp;Delete</button>
                    </td>
                </tr>
            )
        );
    }

    function totalOfPaybleBill(){
        var total = 0;
        for(var a = 0; a < data.length; ++a){
            total = total + Number(data[a].netPrice);
        }
        return total;
    }

    //Add New Item

    function handle(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddNewValidate(){
        const newData: any = {...addNew};
        if(newData["itemID"] === "" || newData["itemID"] === undefined){
            console.log("itemID");
            return false;
        }
        else if(newData["stockID"] === "" || newData["stockID"] === undefined){
            console.log("stockID");
            return false;
        }
        else if(newData["cartQty"] === "" || newData["cartQty"] === undefined){
            console.log("cartQty");
            return false;
        }
        else{
            return true;
        }
    }

    function addnewItem(){
        var data = {
            "itemID": addNew.itemID,
            "stockID": addNew.stockID,
            "cartQty": addNew.cartQty,
            "price": 20,
            "sellerID": sessionStorage.getItem("userID")
        };
        if(AddNewValidate() == true){
            Services.PostCart(data)
            .then(({data}) =>{
                console.log(data);
                fetchData();
                setAddNew({
                    "itemID": 0,
                    "stockID": 0,
                    "cartQty": 1
                });
            }).catch(({response})=>{
                console.log(response);
                setAddNew({
                    "itemID": 0,
                    "stockID": 0,
                    "cartQty": 1
                });
                alert(response);
            })
        }
        setPpbtn(0);
        console.log(data);
    }

    function deleteItem(id: number){
        Services.DeleteCart(id)
        .then(({data}) =>{
            console.log(data);
            fetchData();
        }).catch(({response})=>{
            console.log(response);
            alert(response);
        })
    }

    //Print Bill
    function fetchBillData(id: number){
        Services.PrintBill(id)
        .then(({data}) =>{
            console.log(data);
            setBill(data);
            printBillRealTime(data);
        }).catch(({response})=>{
            responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function fetchBillDataForView(id: number){
        Services.PrintBill(id)
        .then(({data}) =>{
            console.log(data);
            setBill(data);
        }).catch(({response})=>{
            responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function printBill(){
        const doc = new jsPDF('portrait', 'px', 'a4', false);
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(images.bill,'JPEG', 0,0,width,height);

        var printDataTable: any = [];
        bill.map((data, index) =>{
            var dataset = [
                index+1,
                data.itemID,
                data.stockID,
                data.itemName,
                data.unit,
                data.soldQty,
                data.price,
                data.soldPrice
            ];
            printDataTable.push(dataset);
        });

        var total = 0;
        for(var a = 0; a < bill.length; ++a){
            total = total + Number(bill[a].soldPrice);
        }

        doc.setFontSize(12);

        doc.text("Bill #", 20, 100);
        doc.text(": "+ bill[0].billNo, 70, 100);
        doc.text("Bill Date", (width/2), 100);
        doc.text(": "+ (bill[0].timescape).substring(0, 10) + " " + (bill[0].timescape).substring(11, 19), (width/2)+50, 100);

        doc.text("Seller ", 20, 120);
        doc.text(": "+ bill[0].userName, 70, 120);
        doc.text("Total Bill", (width/2), 120);
        doc.text(": "+ ("LKR. "+total), (width/2)+50, 120);

        var margin: any = {top: 1};

        var options: any= {
            theme: 'striped',
	        startY: 170,
	        pageBreak: 'avoid',
            margin: margin
        };

        var exac: any = {
            head: [['ID', 'Item ID', 'Stock ID', 'Item Details', 'Unit', 'Qty', 'Unit Price', 'Total Price']],
            body: printDataTable,
            margin: { top: 150 },
            options: options
        }

        autoTable(doc, exac);

        doc.save("Bill"+bill[0].billNo+".pdf");
    }

    function printBillRealTime(bldata: any){
        const doc = new jsPDF('portrait', 'px', 'a4', false);
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(images.bill,'JPEG', 0,0,width,height);

        var printDataTable: any = [];
        bldata.map((data: any, index: number) =>{
            var dataset = [
                index+1,
                data.itemID,
                data.stockID,
                data.itemName,
                data.unit,
                data.soldQty,
                data.price,
                data.soldPrice
            ];
            printDataTable.push(dataset);
        });

        var total = 0;
        for(var a = 0; a < bldata.length; ++a){
            total = total + Number(bldata[a].soldPrice);
        }

        doc.setFontSize(12);

        doc.text("Bill #", 20, 100);
        doc.text(": "+ bldata[0].billNo, 70, 100);
        doc.text("Bill Date", (width/2), 100);
        doc.text(": "+ (bldata[0].timescape).substring(0, 10) + " " + (bldata[0].timescape).substring(11, 19), (width/2)+50, 100);

        doc.text("Seller ", 20, 120);
        doc.text(": "+ bldata[0].userName, 70, 120);
        doc.text("Total Bill", (width/2), 120);
        doc.text(": "+ ("LKR. "+total), (width/2)+50, 120);

        var margin: any = {top: 1};

        var options: any= {
            theme: 'striped',
	        startY: 170,
	        pageBreak: 'avoid',
            margin: margin
        };

        var exac: any = {
            head: [['ID', 'Item ID', 'Stock ID', 'Item Details', 'Unit', 'Qty', 'Unit Price', 'Total Price']],
            body: printDataTable,
            margin: { top: 150 },
            options: options
        }

        autoTable(doc, exac);

        doc.save("Bill"+bldata[0].billNo+".pdf");
    }

    //View All bill
    const [allBill, setAllBill] = useState(false);

    const AllBillModelHandleClose = () => setAllBill(false);
    const AllBillModelHandleShow = () => setAllBill(true);

    //View One Bill
    const [oneBill, setOneBill] = useState(false);

    const OneBillModelHandleClose = () => setOneBill(false);
    const OneBillModelHandleShow = () => setOneBill(true);

    function totalOfPaidBill(){
        var total = 0;
        for(var a = 0; a < bill.length; ++a){
            total = total + Number(bill[a].soldPrice);
        }
        return total;
    }

    return(
        <>
            <div className="row">
                <p className="m-4" style={{ color: "#03053B", fontSize: "18px", fontWeight: "600" }}>Bills</p>
            </div>

            <div className="row mx-3">
                <div className="row" id="form" onKeyPress={(e)=> keyRep(e)}>
                    <div className="col">
                        <div className="form-floating mb-4 shadow">
                            <select className="form-select" id="itemID" value={addNew.itemID} onChange={(e) => {handle(e.target.id, e.target.value); fetchStock(Number(e.target.value));}} placeholder="TXT" ref={refItemID}>
                                <option defaultValue="0"> </option>
                                    {item.map((items) =>
                                        <option key={items.itemID} value={items.itemID}>{items.itemName}</option>
                                    )}
                            </select>
                            <label className="form-label" htmlFor="itemID">Item</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-4 shadow">
                            <select className="form-select" id="stockID" value={addNew.stockID} onChange={(e) => handle(e.target.id, e.target.value)} placeholder="TXT" ref={refStockID}>
                                <option value="0"> </option>
                                {stock.map((stocks) =>
                                    <option key={stocks.stockID} value={stocks.stockID}>{Number(stocks.price).toFixed(2)}</option>
                                )}
                            </select>
                            <label className="form-label" htmlFor="stockID">Stock (LKR.)</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-4 shadow">
                            <input type="number" id="cartQty" className="form-control" value={addNew.cartQty} onChange={(e) => handle(e.target.id, e.target.value)} placeholder="TXT" min={1} ref={refCartQty}/>
                            <label className="form-label" htmlFor="cartQty">Qty</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="align-middle">
                            <button className="btn btnPrimaryS btn-lg shadow" onClick={() => addnewItem()} style={{height: "57px"}}><i className="bi bi-save"></i>&nbsp; Add to Bill</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <button type="button" className="btn text-light btnFloating" onClick={() => AllBillModelHandleShow()} style={{position:"fixed", width:"60px", height:"60px", bottom:"110px", right:"40px", borderRadius: "50%"}}>
                        <i className="bi bi-clipboard2-pulse"></i>
                    </button>
                    <Modal show={allBill} onHide={AllBillModelHandleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">View All Bills</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                {/* <div className="d-flex justify-content-center">
                                    <p className="text-secondary" style={{fontSize: "36px"}}><strong>List Of Bill</strong></p>
                                </div> */}

                                <div className="px-5">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <div className="form-floating" style={{ minWidth: "300px" }}>
                                                <input className="form-control" type="text" id="txtSearch" placeholder="Search" onChange={(e) => SearchText(e.target.value)}/>
                                                <label htmlFor="txtSearch" className="form-label"><i className="bi bi-search text-secondary" /></label>
                                            </div>
                                        </div>
                                        <div>
                                            {/* <button type="button" className="btn btnPrimary" onClick={() => { AddModelHandleShow(); setTimeout(() =>{ refItemName.current?.focus() }, 1000); }}><i className="bi bi-plus"></i> &nbsp; Add item</button> */}
                                        </div>
                                    </div>

                                    <table className="table">
                                        <thead className="theadStyle">
                                            <tr className="">
                                                <th scope="col" className="text-light text-center">#</th>
                                                <th scope="col" className="text-light text-center">Bill #</th>
                                                <th scope="col" className="text-light text-center">Timescape</th>
                                                <th scope="col" className="text-light text-center">Item Count</th>
                                                <th scope="col" className="text-light text-center">Total Bill</th>
                                                <th scope="col" className="text-light text-center">Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentPosts.map((dts: any, index) =>
                                                    <tr className="" key={index + 1}>
                                                        <td className="text-center">{index+((currentPage-1)*recordsPerPage)+1}</td>
                                                        <td className="text-center">{dts.billNo}</td>
                                                        <td className="text-center">{(dts.timescape).substring(0, 10)+ " " +(dts.timescape).substring(11, 19)}</td>
                                                        <td className="text-center">{dts.itemCount}</td>
                                                        <td className="text-end">{parseFloat(dts.billPrice).toFixed(2)}</td>
                                                        <td className="text-center">
                                                            <button className="btn btnPrimaryS mx-2" onClick={() => {OneBillModelHandleShow(); fetchBillDataForView(Number(dts.billNo));}}>
                                                                <i className="bi bi-clipboard2-data"></i>&nbsp; View
                                                            </button>
                                                            <Modal show={oneBill} onHide={OneBillModelHandleClose}  fullscreen={true}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>View All Bills</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body className="bg-light">
                                                                    <div className="py-2">

                                                                        <button type="button" className="btn text-dark" onClick={() => printBill()} style={{position:"fixed", width:"60px", height:"60px", top:"80px", right:"50px", borderRadius: "50%", backgroundColor: "#ffcc00", fontSize:"28px"}}>
                                                                            <i className="bi bi-printer"></i>
                                                                        </button>

                                                                        <div className="container bg-dark py-2">
                                                                            <div className="bg-white" style={{minHeight: "80vh"}}>
                                                                                <div className="d-flex justify-content-center">
                                                                                    <p className="text-primary" style={{fontSize: "36px"}}><strong>Invoice</strong></p>
                                                                                </div>

                                                                                <div className="mb-4" style={{paddingLeft: "250px", paddingRight: "250px"}}>
                                                                                    <div className="row mx-4">
                                                                                        <div className="col-2"><p><strong>Bill #</strong></p></div>
                                                                                        <div className="col-4"><p>: {bill[0].billNo}</p></div>
                                                                                        <div className="col-2"><p><strong>Bill Date</strong></p></div>
                                                                                        <div className="col-4"><p>: {(bill[0].timescape).substring(0, 10) + " " + (bill[0].timescape).substring(11, 19)}</p></div>
                                                                                    </div>
                                                                                    <div className="row mx-4">
                                                                                        <div className="col-2"><p><strong>Saller </strong></p></div>
                                                                                        <div className="col-4"><p>: {bill[0].userName}</p></div>
                                                                                        <div className="col-2"><p><strong></strong></p></div>
                                                                                        <div className="col-4"><p></p></div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="px-5">
                                                                                    <table className="table">
                                                                                        <thead className="bg-dark text-light">
                                                                                            <tr>
                                                                                                <th className="text-center">#</th>
                                                                                                <th className="text-center">Item ID</th>
                                                                                                <th className="text-center">Stock ID</th>
                                                                                                <th className="text-center">Item Details</th>
                                                                                                <th className="text-center">Unit</th>
                                                                                                <th className="text-center">Qty</th>
                                                                                                <th className="text-center">Unit Price</th>
                                                                                                <th className="text-center">Total Price</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                bill.map((data, index) =>
                                                                                                    <tr>
                                                                                                        <td className="text-center">{index+1}</td>
                                                                                                        <td className="text-center">{data.itemID}</td>
                                                                                                        <td className="text-center">{data.stockID}</td>
                                                                                                        <td className="text-start">{data.itemName}</td>
                                                                                                        <td className="text-center">{data.unit}</td>
                                                                                                        <td className="text-end">{data.soldQty}</td>
                                                                                                        <td className="text-end">{data.price}</td>
                                                                                                        <td className="text-end">{data.soldPrice}</td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }                    
                                                                                        </tbody>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td className="text-center"></td>
                                                                                                <td className="text-center"></td>
                                                                                                <td className="text-center"></td>
                                                                                                <td className="text-start"></td>
                                                                                                <td className="text-center"><strong>Total (LKR.) </strong></td>
                                                                                                <td className="text-end"></td>
                                                                                                <td className="text-end"></td>
                                                                                                <td className="text-end"><strong>{Number(totalOfPaidBill()).toFixed(2)}</strong></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={OneBillModelHandleClose}>
                                                                        Close
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </td>
                                                    </tr>
                                                )
                                            }
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
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={AllBillModelHandleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                            {/*<Modal show={allBill} onHide={AllBillModelHandleClose}  fullscreen={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>View All Bills</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="bg-light">
                                    <div className="py-2">

                                        <button type="button" className="btn text-dark" style={{position:"fixed", width:"60px", height:"60px", top:"80px", right:"50px", borderRadius: "50%", backgroundColor: "#ffcc00", fontSize:"28px"}}>
                                            <i className="bi bi-printer"></i>
                                        </button>

                                        <div className="container bg-dark py-2">
                                            <div className="bg-white" style={{minHeight: "80vh"}}>
                                                <div className="d-flex justify-content-center">
                                                    <p className="text-primary" style={{fontSize: "36px"}}><strong>Good Receiving Note</strong></p>
                                                </div>

                                                <div className="px-5">
                                                    <table className="table">
                                                        <thead>

                                                        </thead>
                                                        <tbody>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={AllBillModelHandleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>*/}
                        </div>
                    </div>

                <div className="row mx-3">
                    <div>
                        <div className="my-2">
                            <table className="table">
                                <thead className="theadStyle">
                                    <tr>
                                        <th scope="col" className="text-light text-center">#</th>
                                        <th scope="col" className="text-light text-center">Item ID</th>
                                        <th scope="col" className="text-light text-center">Stock ID</th>
                                        <th scope="col" className="text-light text-center">Item</th>
                                        <th scope="col" className="text-light text-center">Unit</th>
                                        <th scope="col" className="text-light text-center">Qty</th>
                                        <th scope="col" className="text-light text-center">Unit Price</th>
                                        <th scope="col" className="text-light text-center">Net Price</th>
                                        <th scope="col" className="text-light text-center">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printTable()}
                                </tbody>
                                <tfoot>
                                    <tr className="text-center table-active">
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">Total (LKR.) :</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col" className="text-end">{Number(totalOfPaybleBill()).toFixed(2) }</th>
                                        <th scope="col"></th>
                                    </tr>
                                </tfoot>
                            </table>
   
                            <div className="d-flex justify-content-end mx-2">
                                {/* {ppbtn===0 &&
                                    <button className="btn py-3 px-4" onClick={() => {ProcessBill(); }} style={{ backgroundColor: "#337AB7", color: "white", fontSize: "24px" }}><i className="bi bi-arrow-repeat"></i>&nbsp;Process Bill</button>
                                }
                                {ppbtn===1 &&
                                    <button className="btn py-3 px-4" onClick={() => printBill()} style={{ backgroundColor: "#337AB7", color: "white", fontSize: "24px" }}><i className="bi bi-receipt"></i>&nbsp;Print</button>
                                } */}
                                    <button className="btn py-3 px-4" onClick={() => {ProcessBill(); }} style={{ backgroundColor: "#337AB7", color: "white", fontSize: "24px" }}><i className="bi bi-arrow-repeat"></i>&nbsp;Process Bill</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}