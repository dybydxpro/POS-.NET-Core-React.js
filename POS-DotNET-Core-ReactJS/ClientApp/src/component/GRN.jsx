import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import Services from "../Services";
import Common from "../services/common";
import { Button, Modal } from 'react-bootstrap';
import canvasImg from '../image/grn.jpg';

import SlideBar from "./SlideBar";

export default function GRN(){
    const [data, setData] = useState([{
        "grnNo": 0,
        "grnDate": "",
        "invoiceNo": "",
        "supplierName": "",
        "itemCount": 0,
        "billPrice": 0
    }]);
    const [supplier, setSupplier] = useState([{
        "supplierID": 0,
        "supplierName": "string",
        "address": "string",
        "contactNumber": "string"
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

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            window.location.replace("/login");
        }

        fetchData();
        fetchItem();
        fetchSupplier();
        fetchGRNCart();
    },[]);

    function fetchData(){
        Services.GetAllGRNs().then(({data})=>{
            setData(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
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

    function fetchSupplier(){
        Services.GetAllSuppliersASC().then(({data})=>{
            setSupplier(data)
        })
        .catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
        })
    }

    function SearchText(e){
        const search = e.target.value;
        if(search === ""){
            fetchData();
        }
        else{
            Services.GetSearchGRNs(search).then(({data})=>{
                setData(data)
            })
            .catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
            })
        }
    }

    function dateToDateTime(vals){
        const dt = vals.split("-");
        const dtv = new Date(dt[0], Number(dt[1])-1, Number(dt[2])+1, 0,0,0,0);
        return dtv;
    }

    function printGRN(){
        const doc = new jsPDF('landscape', 'px', 'a4', 'false');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(canvasImg,'JPEG', 0,0,width,height);

        var printDataTable = [];
        viewGRN.map((data, index) =>{
            var dataset = [
                index+1,
                data.itemID,
                data.stockID,
                data.itemName,
                data.unit,
                data.grnQty,
                data.bulckPrice,
                data.actualBulkPrice,
                data.remarks
            ]
            printDataTable.push(dataset);
        });
        
        doc.setFontSize(12);

        doc.text(20, 100, "GRN #");
        doc.text(70, 100, ": "+ viewGRN[0].grnNo);
        doc.text((width/3), 100, "GRN Date");
        doc.text((width/3)+50, 100, ": "+ (viewGRN[0].grnDate).substring(0, 10));
        doc.text(2*(width/3), 100, "Invoice #");
        doc.text(2*(width/3)+50, 100, ": "+ viewGRN[0].invoiceNo);

        doc.text(20, 120, "Invoice Date");
        doc.text(70, 120, ": "+ (viewGRN[0].invoiceDate).substring(0, 10));
        doc.text((width/3), 120, "Supplier");
        doc.text((width/3)+50, 120, ": "+ viewGRN[0].supplierName);
        doc.text(2*(width/3), 120, "Supplier Add");
        doc.text(2*(width/3)+50, 120, ": "+ viewGRN[0].address);

        doc.text(20, 140, "Contact No");
        doc.text(70, 140, ": "+ viewGRN[0].contactNumber);
        doc.text((width/3), 140, "Pay Type");
        doc.text((width/3)+50, 140, ": "+ viewGRN[0].payType);
        doc.text(2*(width/3), 140, "Due Date");
        doc.text(2*(width/3)+50, 140, ": "+ (viewGRN[0].dueDate === "2000-01-01T00:00:00" ? "": viewGRN[0].dueDate).substring(0, 10));

        doc.text(20, 160, "GRN by");
        doc.text(70, 160, ": "+ viewGRN[0].userName);

        doc.text(width/2, 170, "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------", { align: 'center' });
        
        var options = {
            theme: 'striped',
	        startY: 180,
	        pageBreak: 'avoid',
            margin: {top: 1}
        };

        autoTable(doc, {
            head: [['ID', 'Item ID', 'Stock ID', 'Item Details', 'Unit', 'Qty', 'Bulk Price', 'Act. Bulk Price', 'Remarks']],
            body: printDataTable,
            margin: { top: 180 },
            options: options
        });

        doc.save("GRN"+viewGRN[0].grnNo+".pdf");
    }

    function printTable(){
        return(
            data.map(dataset =>
                <tr key={dataset.grnNo}>
                    <td>{dataset.grnNo}</td>
                    <td>{(dataset.grnDate).substring(0, 10)}</td>
                    <td>{dataset.invoiceNo}</td>
                    <td>{dataset.supplierName}</td>
                    <td>{dataset.itemCount}</td>
                    <td>{dataset.billPrice}</td>
                    <td>
                        <button type="button" className="btn btn-info mx-2" onClick={()=>{ViewModelHandleShow(); GetOneGRN(dataset.grnNo);}}><i className="bi bi-clipboard2-data"></i>&nbsp; View</button>
                        <Modal show={viewModel} onHide={ViewModelHandleClose}  fullscreen={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>View Good Recieving Note</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-light">
                                <div className="py-2">

                                    <button type="button" className="btn text-dark" onClick={() => printGRN()} style={{position:"fixed", width:"60px", height:"60px", top:"80px", right:"50px", borderRadius: "50%", backgroundColor: "#ffcc00", fontSize:"28px"}}>
                                        <i className="bi bi-printer"></i>
                                    </button>

                                    <div className="container bg-dark py-2">
                                        <div className="bg-white" style={{minHeight: "80vh"}}>
                                            <div className="d-flex justify-content-center">
                                                <p className="text-primary" style={{fontSize: "36px"}}><strong>Good Receiving Note</strong></p>
                                            </div>

                                            <div className=" mb-4">
                                                <div className="row mx-4">
                                                    <div className="col-2"><p><strong>GRN #</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].grnNo}</p></div>
                                                    <div className="col-2"><p><strong>GRN Date</strong></p></div>
                                                    <div className="col-4"><p>: {(viewGRN[0].grnDate).substring(0, 10)}</p></div>
                                                </div>
                                                <div className="row mx-4">
                                                    <div className="col-2"><p><strong>Invoice #</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].invoiceNo}</p></div>
                                                    <div className="col-2"><p><strong>Invoice Date</strong></p></div>
                                                    <div className="col-4"><p>: {(viewGRN[0].invoiceDate).substring(0, 10)}</p></div>
                                                </div>
                                                <div className="row mx-4">
                                                    <div className="col-2"><p><strong>Supplier Name</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].supplierName}</p></div>
                                                    <div className="col-2"><p><strong>Supplier Address</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].address}</p></div>
                                                </div>
                                                <div className="row mx-4">
                                                    <div className="col-2"><p><strong>Contact Number</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].contactNumber}</p></div>
                                                    <div className="col-2"><p><strong>Pay Type</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].payType}</p></div>
                                                </div>
                                                <div className="row mx-4">
                                                    <div className="col-2"><p><strong>GRN by</strong></p></div>
                                                    <div className="col-4"><p>: {viewGRN[0].userName}</p></div>
                                                    <div className="col-2"><p><strong>Due Date</strong></p></div>
                                                    <div className="col-4"><p>: {(viewGRN[0].dueDate === "2000-01-01T00:00:00" ? "": viewGRN[0].dueDate).substring(0, 10)}</p></div>
                                                </div>
                                            </div>

                                            <div className="px-5">
                                                <table className="table">
                                                    <thead>
                                                        <tr className="bg-warning">
                                                            <th scope="col">#</th>
                                                            <th scope="col">Item ID</th>
                                                            <th scope="col">Stock ID</th>
                                                            <th scope="col">Item</th>
                                                            <th scope="col">Unit</th>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Unit Price</th>
                                                            <th scope="col">Bulk Price</th>
                                                            <th scope="col">Act. Bulk Price</th>
                                                            <th scope="col">Remarks</th>
                                                            {/*<th scope="col">Options</th>*/}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {viewGRN.map((dts, index) =>
                                                        <tr className="table-warning" key={index + 1}>
                                                            <td>{index + 1}</td>
                                                            <td>{dts.itemID}</td>
                                                            <td>{dts.stockID}</td>
                                                            <td>{dts.itemName}</td>
                                                            <td>{dts.unit}</td>
                                                            <td>{dts.grnQty}</td>
                                                            <td>{dts.price}</td>
                                                            <td>{dts.bulckPrice}</td>
                                                            <td>{dts.actualBulkPrice}</td>
                                                            <td>{dts.remarks}</td>
                                                            {/*<td>
                                                                <button type="button" className="btn btn-warning" onClick={() => {EditGRNModelHandleShow(); fetchGRNData(dts.grnid);}}>
                                                                    <i className="bi bi-pencil"></i>&nbsp; Edit
                                                                </button>
                                                                <Modal show={editGRNModel} onHide={EditGRNModelHandleClose}>
                                                                    <Modal.Header closeButton className="bg-light">
                                                                        <Modal.Title>GRN</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body className="bg-light">
                                                                        <div className="py-2">
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
                                                                    <Modal.Footer className="bg-light">
                                                                        <Button variant="secondary" onClick={EditGRNModelHandleClose}>
                                                                            Close
                                                                        </Button>
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </td>*/}
                                                        </tr>)}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={ViewModelHandleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                </tr>
            )
        );
    }

    //View Model
    const [viewModel, setViewModel] = useState(false);

    const ViewModelHandleClose = () => setViewModel(false);
    const ViewModelHandleShow = () => setViewModel(true);

    //View GRN
    const [viewGRN, setViewGRN] = useState([{
        "grnid": 0,
        "grnNo": 0,
        "grnDate": "2000-00-00T00:00:00.000Z",
        "invoiceNo": "",
        "invoiceDate": "2000-00-00T00:00:00.000Z",
        "supplierID": 0,
        "supplierName": "",
        "address": "",
        "contactNumber": "",
        "itemID": 0,
        "itemName": "",
        "stockID": 0,
        "price": 0,
        "unit": "",
        "grnQty": 0,
        "payType": "",
        "bulckPrice": 0,
        "actualBulkPrice": 0,
        "userName": "",
        "dueDate": "2000-00-00T00:00:00.000Z",
        "remarks": ""
    }]);

    function GetOneGRN(id){
        Services.GetOneGRN(id)
        .then(({data}) =>{
            console.log(data);
            setViewGRN(data);
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })     
    }

    //Add Model
    const [addModel, setAddModel] = useState(false);
    const [addXModel, setAddXModel] = useState(false);

    const [data1, setData1] = useState([{
        "grnid": 0,
        "invoiceNo": "",
        "invoiceDate": "",
        "supplierID": 0,
        "itemID": 0,
        "stockID": 0,
        "grnQty": 0,
        "payType": "",
        "bulckPrice": 0,
        "actualBulkPrice": 0,
        "grnRecorderID": 0,
        "dueDate": "",
        "remarks": ""
    }])

    const AddModelHandleClose = () => setAddModel(false);
    const AddModelHandleShow = () => setAddModel(true);
    const AddXModelHandleClose = () => setAddXModel(false);
    const AddXModelHandleShow = () => setAddXModel(true);

    //Add New 
    const [addCons, setAddCons] = useState({
        "invoiceNo": "", 
        "invoiceDate": "", 
        "supplierID": 0, 
        "payType": "",
        "dueDate": ""
    });
    const [addNew, setAddNew] = useState({
        "itemID": 0,
        "stockID": 0,
        "grnQty": 0,
        "bulckPrice": 0,
        "remarks": ""
    });

    function handleAdd(e){
        const newData = {...addNew};
        newData[e.target.id] = e.target.value;
        setAddNew(newData);
        console.log(newData);
    }

    function handleAddCons(e){
        const newData = {...addCons};
        newData[e.target.id] = e.target.value;
        setAddCons(newData);
        console.log(newData);
    }

    function AddNewValidate(){
        const consData = {...addCons};
        const newData = {...addNew};
        if(consData["invoiceNo"] === "" || consData["invoiceNo"] === undefined){
            console.log("invoiceNo");
            return false;
        }
        else if(consData["invoiceDate"] === "" || consData["invoiceDate"] === undefined){
            console.log("invoiceDate");
            return false;
        }
        else if(consData["supplierID"] === "" || consData["supplierID"] === undefined){
            console.log("supplierID");
            return false;
        }
        else if(consData["payType"] === "" || consData["payType"] === undefined){
            console.log("payType");
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
        else if(newData["grnQty"] === "" || newData["grnQty"] === undefined){
            console.log("grnQty");
            return false;
        }
        else if(newData["bulckPrice"] === "" || newData["bulckPrice"] === undefined){
            console.log("bulckPrice");
            return false;
        }
        else{
            return true;
        }
    }

    function AddGRNCart(){
        if(AddNewValidate()){
            var data = ({
                "invoiceNo": addCons.invoiceNo,
                "invoiceDate": dateToDateTime(addCons.invoiceDate),
                "supplierID": addCons.supplierID,
                "itemID": addNew.itemID,
                "stockID": addNew.stockID,
                "grnQty": addNew.grnQty,
                "payType": addCons.payType,
                "bulckPrice": addNew.bulckPrice,
                "actualBulkPrice": 0,
                "grnRecorderID": sessionStorage.getItem('userID'),
                "dueDate": addCons.dueDate === "" ? "2000-01-01" : dateToDateTime(addCons.dueDate),
                "remarks": addNew.remarks
            });  //dateToDateTime(addCons.dueDate==""?"2000-01-01":addCons.dueDate)
            console.log(data);
            Services.PostGRNCart(data)
            .then(({data}) =>{
                console.log(data);
                AddXModelHandleClose();
                fetchGRNCart();
            }).catch(({response})=>{
                Common.responseManage(response);
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }
        
    }

    function fetchGRNCart(){
        Services.GetAllGRNCarts(sessionStorage.getItem("userID"))
        .then(({data}) =>{
            console.log(data);
            setData1(data);
            setAddNew({
                    "itemID": 0,
                    "stockID": 0,
                    "grnQty": 0,
                    "bulckPrice": 0,
                    "remarks": ""
            });
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function deleteFromCart(id){
        Services.DeleteGRNCart(id)
        .then(({data}) =>{
            console.log(data);
            setAddNew({});
            fetchGRNCart();
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function addNewGRN(){
        Services.PostGRNs(sessionStorage.getItem("userID"))
        .then(({data}) =>{
            console.log(data);
            fetchData();
            setData1([{
                "grnid": 0,
                "invoiceNo": "",
                "invoiceDate": "",
                "supplierID": 0,
                "itemID": 0,
                "stockID": 0,
                "grnQty": 0,
                "payType": "",
                "bulckPrice": 0,
                "actualBulkPrice": 0,
                "grnRecorderID": 0,
                "dueDate": "",
                "remarks": ""
            }]);
            AddModelHandleClose();
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    //Edit GRN Model
    const [editGRNModel, setEditGRNModel] = useState(false);

    const EditGRNModelHandleClose = () => setEditGRNModel(false);
    const EditGRNModelHandleShow = () => setEditGRNModel(true);

    //Edit GRN
    const [editGRN, setEditGRN] = useState({
        "grnid": 0,
        "itemID": 0,
        "stockID": 0,
        "grnQty": 0,
        "bulckPrice": 0,
        "remarks": ""
    });

    function fetchGRNData(id){
        Services.PostGRNs(id)
        .then(({data}) =>{
            console.log(data);
  
        }).catch(({response})=>{
            Common.responseManage(response);
            console.log(response);
            alert(response);
        })
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
                                <li className="breadcrumb-item active" aria-current="page">GRNs</li>
                            </ol>
                        </nav>
                    </div>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded m-2" style={{minHeight: "87vh"}}>
                        <div className="text-center">
                            <p className="h2 mb-1">List of Good Recieving Notes</p>
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
                                        <th scope="col">GRN #</th>
                                        <th scope="col">GRN Date</th>
                                        <th scope="col">Invoice #</th>
                                        <th scope="col">Supplier Name</th>
                                        <th scope="col">Item Count</th>
                                        <th scope="col">Bill Price</th>
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
                <Modal show={addModel} onHide={AddModelHandleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Add GRN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="invoiceNo" onChange={(e) => handleAddCons(e)} placeholder="TXT"/>
                                            <label htmlFor="invoiceNo" className="form-label">Invoice Number</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="invoiceDate" onChange={(e) => handleAddCons(e)} placeholder="TXT"/>
                                            <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="supplierID" onChange={(e) => handleAddCons(e)} placeholder="TXT">
                                                <option value="" selected>_</option>
                                                {
                                                    supplier.map(sup => <option key={sup.supplierID} value={sup.supplierID}>{sup.supplierName}</option>)
                                                }
                                            </select>
                                            <label htmlFor="supplierID" className="form-label">Supplier Name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="payType" onChange={(e) => handleAddCons(e)} placeholder="NOS">
                                                <option value="" selected>_</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Credit">Credit</option>
                                            </select>
                                            <label htmlFor="payType" className="form-label">Pay Type</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dueDate" onChange={(e) => handleAddCons(e)} placeholder="TXT"/>
                                            <label htmlFor="dueDate" className="form-label">Due Date</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-light" onClick={AddXModelHandleShow}>
                                            <i className="bi bi-plus">Add Item</i>
                                        </button>
                                        <Modal show={addXModel} onHide={AddXModelHandleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Stock</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
                                                    <div className="form-floating mb-3">
                                                        <select className="form-select" id="itemID" onChange={(e) => {handleAdd(e); fetchStock(e);}} placeholder="Item">
                                                            <option value="" selected>_</option>
                                                            {
                                                                item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                                            }
                                                        </select>
                                                        <label htmlFor="itemID" className="form-label">Item Name</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <select className="form-select" id="stockID" onChange={(e) => handleAdd(e)} placeholder="Item">
                                                            <option value="" selected>_</option>
                                                            {
                                                                stock.map(stocks => <option key={stocks.stockID} value={stocks.stockID}>{stocks.price}</option>)
                                                            }
                                                        </select>
                                                        <label htmlFor="stockID" className="form-label">Stock</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input type="text" className="form-control" id="grnQty" onChange={(e) => handleAdd(e)} placeholder="0.00"/>
                                                        <label htmlFor="grnQty" className="form-label">Qty</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input type="text" className="form-control" id="bulckPrice" onChange={(e) => handleAdd(e)} placeholder="0.00"/>
                                                        <label htmlFor="bulckPrice" className="form-label">Bulck Price</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <textarea className="form-control" id="remarks" onChange={(e) => handleAdd(e)} placeholder="0.00"></textarea>
                                                        <label htmlFor="remarks" className="form-label">Remakes</label>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="success" onClick={() => AddGRNCart()}>
                                                    Save
                                                </Button>
                                                <Button variant="secondary" onClick={AddXModelHandleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <table className="table">
                                    <thead>
                                        <tr className="bg-warning">
                                            <th scope="col">#</th>
                                            <th scope="col">Item ID</th>
                                            <th scope="col">Stock ID</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Unit</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Bulk Price</th>
                                            <th scope="col">Act. Bulk Price</th>
                                            <th scope="col">Remarks</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data1.map((dts, index) =>
                                        <tr className="table-warning align-middle" key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{dts.itemID}</td>
                                            <td>{dts.stockID}</td>
                                            <td>{dts.itemName}</td>
                                            <td>{dts.unit}</td>
                                            <td>{dts.grnQty}</td>
                                            <td>{dts.price}</td>
                                            <td>{dts.bulckPrice}</td>
                                            <td>{dts.actualBulkPrice}</td>
                                            <td>{dts.remarks}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={(e) => deleteFromCart(dts.grnid)}>
                                                    <i className="bi bi-pencil"></i>&nbsp; Delete
                                                </button>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => addNewGRN()}>Save</Button>
                        <Button variant="secondary" onClick={AddModelHandleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}