import React, {useEffect, useState, useRef} from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Button, Modal } from 'react-bootstrap';
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import * as images from '../assets/image/images';

export default function BillFullScrean(){
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

        // setTimeout(() =>{
        //     refItemID.current?.focus();
        // }, 1000);

        fetchData();
        fetchItem();
        fetchAllBill();
    },[]);

    /* Pagination */
    const indexOfLastRecord = Number(currentPage * recordsPerPage);
    const indexOfFirstRecord = Number(indexOfLastRecord - recordsPerPage);
    const numberOfPages = Math.ceil(item.length / recordsPerPage);
    const pageNumbers  = [...Array.from(Array(numberOfPages+1).keys())].slice(1); 
    const currentPosts = item.slice(indexOfFirstRecord, indexOfLastRecord);
        
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
        if(search === ""){
            fetchItem();
        }
        else{
            Services.GetSearchItems(search).then(({data})=>{
                setItem(data)
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
            <div style={{ backgroundColor:"#03053B", maxHeight: "100vh", minHeight: "100vh", padding: "15px", overflowY: "hidden" }}>
                <div className="shadow-sm px-3 mb-5 rounded" style={{ maxHeight: "96vh", minHeight: "96vh", backgroundColor: "#eeeeee" }}>
                    <div className="row py-3">
                        <div className="col-sm-9">
                            <div className="shadow-sm pl-3 pr-2 mb-5 rounded" style={{ maxHeight: "93vh", minHeight: "93vh", backgroundColor: "#ffffff" }}>
                                <div className="px-2">
                                    <div className="row">
                                        <div className="row">
                                            <p className="m-4" style={{ color: "#03053B", fontSize: "18px", fontWeight: "600" }}>Bills</p>
                                        </div>

                                        <div className="row mx-3" id="form" onKeyPress={(e)=> keyRep(e)}>
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

                                        <div className="px-4"><hr/></div>
                                        
                                        <div className="px-4">
                                            <div className="my-2">
                                                <div>
                                                    <div className="form-floating" style={{ minWidth: "300px", maxWidth: "300px" }}>
                                                        <input className="form-control" type="text" id="txtSearch" placeholder="Search" onChange={(e) => SearchText(e.target.value)}/>
                                                        <label htmlFor="txtSearch" className="form-label"><i className="bi bi-search text-secondary" /></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-2">
                                                <table className="table">
                                                    <thead className="theadStyle">
                                                        <tr>
                                                            <th scope="col" className="text-light text-center">#</th>
                                                            <th scope="col" className="text-light text-center">Item ID</th>
                                                            <th scope="col" className="text-light text-center">Item Name</th>
                                                            <th scope="col" className="text-light text-center">Unit</th>
                                                            <th scope="col" className="text-light text-center" style={{ width: "220px" }}>Options</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            currentPosts.map((dataset, index) =>
                                                                <tr key={dataset.itemID}>
                                                                    <td className="text-center">{index+((currentPage-1)*recordsPerPage)+1}</td>
                                                                    <td className="text-center">{dataset.itemID}</td>
                                                                    <td>{dataset.itemName}</td>
                                                                    <td className="text-center">{dataset.unit}</td>
                                                                    <td className="text-center">
                                                                        <button type="button" className="btn btnPrimaryS mx-2" onClick={() => {handle("itemID", String(dataset.itemID)); fetchStock(Number(dataset.itemID));}}><i className="bi bi-box-arrow-in-right"></i>&nbsp; Add to Bucket</button>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="shadow-sm pl-2 pr-3 mb-5 rounded" style={{ maxHeight: "93vh", minHeight: "93vh", backgroundColor: "#ffffff" }}>
                                <div className="p-2">
                                    <div>
                                        <ul className="list-group">
                                            <li className="list-group-item"style={{ backgroundColor:"#03053B" }}>
                                                <div className="d-flex justify-content-center">
                                                    <p className="h3 text-light pt-2">Shopping List</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ol className="list-group list-group-numbered">
                                            {
                                                data.map((dt: any, index: any) =>
                                                <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                                                    <div className="ms-2 me-auto">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="fw-bold">{dt.itemName}</div>
                                                            <span className="badge bg-danger rounded-pill p-2" onClick={() => deleteItem(dt.cartID)}><i className="bi bi-x-lg"></i></span>
                                                        </div>
                                                        <div className="row" style={{ minWidth: "20vw" }}>
                                                            <div className="col-sm-2">{dt.unit}</div>
                                                            <div className="col-sm-2 text-end">{dt.cartQty}</div>
                                                            <div className="col-sm-4 text-end">{parseFloat(dt.price).toFixed(2)}</div>
                                                            <div className="col-sm-4 text-end">{parseFloat(dt.netPrice).toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                </li>
                                                )
                                            }
                                        </ol>

                                        <div>
                                            <ul className="list-group">
                                                <li className="list-group-item"style={{ backgroundColor:"#03053B" }}>
                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <div className="d-flex justify-content-center">
                                                                <p className="h3 text-light pt-2 text-end">Rs. {Number(totalOfPaybleBill()).toFixed(2) }</p>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <button className="btn" onClick={() => {ProcessBill(); }} style={{ backgroundColor: "#337AB7", color: "white" }}><i className="bi bi-arrow-repeat"></i>&nbsp; <br /> Process Bill</button>
                                                        </div>
                                                    </div>    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}