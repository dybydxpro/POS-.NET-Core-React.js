import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import Services from "../Services";
import Common from "../services/common";
import { Button, Modal } from 'react-bootstrap';
import canvasImg from '../image/bill.jpg';

import SlideBar from "./SlideBar";

export default function Bill(){
    const [data, setData] = useState([]);
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

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
        fetchItem();
        fetchAllBill();
    },[]);

    function fetchAllBill(){
        Services.FetchAllBills().then(({data})=>{
            setAllBillData(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    function fetchData(){
        var id = sessionStorage.getItem("userID");
        Services.GetAllCart(id).then(({data})=>{
            console.log(data);
            setData(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            setData([]);
        })
    }

    function SearchText(e){
        const search = e.target.value;
        console.log(search);
        if(search === ""){
            fetchAllBill();
        }
        else{
            Services.FetchSearchBills(search).then(({data})=>{
                setAllBillData(data)
            })
            .catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
            })
        }
    }

    function fetchItem(){
        Services.GetAllItemsASC().then(({data})=>{
            setItem(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    function fetchStock(e){
        Services.GetAllStocksASC(e.target.value).then(({data})=>{
            setStock(data);
            console.log(data);
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    //Process Bill
    function ProcessBill(){
        var id = sessionStorage.getItem("userID");
        Services.ProcessBill(id).then(({data})=>{
            console.log(data);
            fetchData();
            fetchBillData(Number(data));
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            fetchData();
        })
    }

    function printTable(){
        return(
            data.map((dt, index) => 
                <tr className="table" key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{dt.itemID}</td>
                    <td>{dt.stockID}</td>
                    <td>{dt.itemName}</td>
                    <td>{dt.unit}</td>
                    <td>{dt.cartQty}</td>
                    <td className="text-end">{parseFloat(dt.price).toFixed(2)}</td>
                    <td className="text-end">{parseFloat(dt.netPrice).toFixed(2)}</td>
                    <td>
                        {/*<button type="button" className="btn btn-warning mx-2"><i className="bi bi-pencil"></i>&nbsp;Edit</button>*/}
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

    function handle(e){
        const newData = {...addNew};
        newData[e.target.id] = e.target.value;
        setAddNew(newData);
        console.log(newData);
    }

    function AddNewValidate(){
        const newData = {...addNew};
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
        console.log(data);
    }

    function deleteItem(id){
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
    function fetchBillData(id){
        Services.PrintBill(id)
        .then(({data}) =>{
            console.log(data);
            setBill(data);
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function printBill(){
        const doc = new jsPDF('portrait', 'px', 'a4', 'false');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(canvasImg,'JPEG', 0,0,width,height);

        var printDataTable = [];
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
            ]
            printDataTable.push(dataset);
        });

        var total = 0;
        for(var a = 0; a < bill.length; ++a){
            total = total + Number(bill[a].soldPrice);
        }

        doc.setFontSize(12);

        doc.text(20, 100, "Bill #");
        doc.text(70, 100, ": "+ bill[0].billNo);
        doc.text((width/2), 100, "Bill Date");
        doc.text((width/2)+50, 100, ": "+ (bill[0].timescape).substring(0, 10) + " " + (bill[0].timescape).substring(11, 19));

        doc.text(20, 120, "Seller ");
        doc.text(70, 120, ": "+ bill[0].userName);
        doc.text((width/2), 120, "Total Bill");
        doc.text((width/2)+50, 120, ": "+ ("LKR. "+total));

        var options = {
            theme: 'striped',
	        startY: 170,
	        pageBreak: 'avoid',
            margin: {top: 1}
        };

        autoTable(doc, {
            head: [['ID', 'Item ID', 'Stock ID', 'Item Details', 'Unit', 'Qty', 'Unit Price', 'Total Price']],
            body: printDataTable,
            margin: { top: 150 },
            options: options
        });

        doc.save("Bill"+bill[0].billNo+".pdf");
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
                                <li className="breadcrumb-item active" aria-current="page">Bill</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-3">Bill System</p>
                        </div>

                        <div>
                            <button type="button" className="btn text-light" onClick={() => AllBillModelHandleShow()} style={{position:"fixed", width:"60px", height:"60px", top:"90px", right:"40px", borderRadius: "50%", backgroundColor: "#2e856e", fontSize:"28px"}}>
                                <i className="bi bi-clipboard2-pulse"></i>
                            </button>
                            <Modal show={allBill} onHide={AllBillModelHandleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">View All Bills</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <p className="text-secondary" style={{fontSize: "36px"}}><strong>List Of Bill</strong></p>
                                        </div>
              
                                        <div className="d-flex justify-content-end container">
                                            <div className="form-floating mb-2">
                                                <input type="text" className="form-control" id="search" placeholder="Search" onChange={(e) => SearchText(e)}/>
                                                <label htmlFor="search"><i className="bi bi-search"></i>&nbsp; Search</label>
                                            </div>
                                        </div>

                                        <div className="px-5">
                                                <table className="table">
                                                    <thead>
                                                        <tr className="bg-info">
                                                            <th scope="col" className="text-center">#</th>
                                                            <th scope="col" className="text-center">Bill #</th>
                                                            <th scope="col" className="text-center">Timescape</th>
                                                            <th scope="col" className="text-center">Item Count</th>
                                                            <th scope="col" className="text-center">Total Bill</th>
                                                            <th scope="col" className="text-center">Options</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {allBillData.map((dts, index) =>
                                                        <tr className="table-info" key={index + 1}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className="text-center">{dts.billNo}</td>
                                                            <td className="text-center">{(dts.timescape).substring(0, 10)+ " " +(dts.timescape).substring(11, 19)}</td>
                                                            <td className="text-center">{dts.itemCount}</td>
                                                            <td className="text-end">{parseFloat(dts.billPrice).toFixed(2)}</td>
                                                            <td className="text-center">
                                                                <button className="btn btn-info mx-2" onClick={() => {OneBillModelHandleShow(); fetchBillData(Number(dts.billNo));}}>
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
                                                                                                    <td className="text-end"><strong>{parseFloat(totalOfPaidBill()).toFixed(2)}</strong></td>
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
                                                        </tr>)}
                                                    </tbody>
                                                </table>
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

                        <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-4 shadow">
                                            <select className="form-select" id="itemID" value={addNew.itemID} onChange={(e) => {handle(e); fetchStock(e);}} placeholder="TXT">
                                                <option value="0" selected> </option>
                                                {item.map((items) =>
                                                    <option key={items.itemID} value={items.itemID}>{items.itemName}</option>
                                                )}
                                            </select>
                                            <label className="form-label" htmlFor="itemID">Item</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-4 shadow">
                                            <select className="form-select" id="stockID" value={addNew.stockID} onChange={(e) => handle(e)} placeholder="TXT">
                                                <option value="0" selected> </option>
                                                {stock.map((stocks) =>
                                                    <option key={stocks.stockID} value={stocks.stockID}>{parseFloat(stocks.price).toFixed(2)}</option>
                                                )}
                                            </select>
                                            <label className="form-label" htmlFor="stockID">Stock (LKR.)</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-4 shadow">
                                            <input type="number" id="cartQty" className="form-control" value={addNew.cartQty} onChange={(e) => handle(e)} placeholder="TXT" min={1}/>
                                            <label className="form-label" htmlFor="cartQty">Qty</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="align-middle">
                                            <button className="btn btn-primary btn-lg shadow" onClick={() => addnewItem()} style={{height: "57px"}}><i className="bi bi-save"></i>&nbsp; Add to Bill</button>
                                        </div>
                                    </div>
                                </div>                            

                            <div className="mx-2">
                                <hr />
                            </div>

                            <div className="my-2">
                                <table className="table">
                                    <thead>
                                        <tr className="bg-dark text-light">
                                            <th scope="col">#</th>
                                            <th scope="col">Item ID</th>
                                            <th scope="col">Stock ID</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Unit</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Net Price</th>
                                            <th scope="col">Options</th>
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
                                            <th scope="col" className="text-end">{ parseFloat(totalOfPaybleBill()).toFixed(2) }</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="d-flex justify-content-end mx-2">
                                {ppbtn===0 &&
                                    <button className="btn py-3 px-4" onClick={() => {ProcessBill(); setTimeout(() => {setPpbtn(1);}, 5000);}} style={{ backgroundColor: "#337AB7", color: "white", fontSize: "20px" }}><i className="bi bi-arrow-repeat"></i>&nbsp;Process Bill</button>
                                }
                                {ppbtn===1 &&
                                    <button className="btn py-3 px-4" onClick={() => printBill()} style={{ backgroundColor: "#337AB7", color: "white", fontSize: "20px" }}><i className="bi bi-receipt"></i>&nbsp;Print</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}