import React, { useEffect, useState } from "react";
import Services from "../Services";
import { responseManage } from "../controllers/CommonController";
import { Button, Modal } from 'react-bootstrap';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as images from '../assets/image/images';

export default function GRN(){
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

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
        Services.GetAllGRNs().then(({data})=>{
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

    function fetchSupplier(){
        Services.GetAllSuppliersASC().then(({data})=>{
            setSupplier(data)
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
            Services.GetSearchGRNs(search).then(({data})=>{
                setData(data)
            })
            .catch(({response})=>{
                responseManage(response);
                console.log(response);
            })
        }
    }

    function dateToDateTime(vals: any){
        const dt = vals.split("-");
        const dtv = new Date(dt[0], Number(dt[1])-1, Number(dt[2])+1, 0,0,0,0);
        return dtv;
    }

    function printGRN(){
        const doc = new jsPDF('landscape', 'px', 'a4', false);
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(images.grn,'JPEG', 0,0,width,height);

        var printDataTable: any = [];
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

        doc.text("GRN #", 20, 100);
        doc.text(": "+ viewGRN[0].grnNo, 70, 100);
        doc.text("GRN Date", (width/3), 100);
        doc.text(": "+ (viewGRN[0].grnDate).substring(0, 10), (width/3)+50, 100);
        doc.text("Invoice #", 2*(width/3), 100);
        doc.text(": "+ viewGRN[0].invoiceNo, 2*(width/3)+50, 100);

        // doc.text(20, 100, "GRN #");
        // doc.text(70, 100, ": "+ viewGRN[0].grnNo);
        // doc.text((width/3), 100, "GRN Date");
        // doc.text((width/3)+50, 100, ": "+ (viewGRN[0].grnDate).substring(0, 10));
        // doc.text(2*(width/3), 100, "Invoice #");
        // doc.text(2*(width/3)+50, 100, ": "+ viewGRN[0].invoiceNo);

        doc.text("Invoice Date", 20, 120);
        doc.text(": "+ (viewGRN[0].invoiceDate).substring(0, 10), 70, 120);
        doc.text("Supplier", (width/3), 120);
        doc.text(": "+ viewGRN[0].supplierName, (width/3)+50, 120);
        doc.text("Supplier Add", 2*(width/3), 120);
        doc.text(": "+ viewGRN[0].address, 2*(width/3)+50, 120);

        // doc.text(20, 120, "Invoice Date");
        // doc.text(70, 120, ": "+ (viewGRN[0].invoiceDate).substring(0, 10));
        // doc.text((width/3), 120, "Supplier");
        // doc.text((width/3)+50, 120, ": "+ viewGRN[0].supplierName);
        // doc.text(2*(width/3), 120, "Supplier Add");
        // doc.text(2*(width/3)+50, 120, ": "+ viewGRN[0].address);

        doc.text("Contact No", 20, 140);
        doc.text(": "+ viewGRN[0].contactNumber, 70, 140);
        doc.text("Pay Type", (width/3), 140);
        doc.text(": "+ viewGRN[0].payType, (width/3)+50, 140);
        doc.text("Due Date", 2*(width/3), 140);
        doc.text(": "+ (viewGRN[0].dueDate === "2000-01-01T00:00:00" ? "": viewGRN[0].dueDate).substring(0, 10), 2*(width/3)+50, 140);

        // doc.text(20, 140, "Contact No");
        // doc.text(70, 140, ": "+ viewGRN[0].contactNumber);
        // doc.text((width/3), 140, "Pay Type");
        // doc.text((width/3)+50, 140, ": "+ viewGRN[0].payType);
        // doc.text(2*(width/3), 140, "Due Date");
        // doc.text(2*(width/3)+50, 140, ": "+ (viewGRN[0].dueDate === "2000-01-01T00:00:00" ? "": viewGRN[0].dueDate).substring(0, 10));

        doc.text("GRN by", 20, 160);
        doc.text(": "+ viewGRN[0].userName, 70, 160);

        // doc.text(20, 160, "GRN by");
        // doc.text(70, 160, ": "+ viewGRN[0].userName);

        doc.text("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------", width/2, 170, { align: 'center' });
        // doc.text(width/2, 170, "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------", { align: 'center' });

        var margin: any = {top: 1};

        var options: any = {
            theme: 'striped',
	        startY: 180,
	        pageBreak: 'avoid',
            margin: margin
        };

        var exac: any = {
            head: [['ID', 'Item ID', 'Stock ID', 'Item Details', 'Unit', 'Qty', 'Bulk Price', 'Act. Bulk Price', 'Remarks']],
            body: printDataTable,
            margin: { top: 180 },
            options: options
        };

        autoTable(doc, exac);

        doc.save("GRN"+viewGRN[0].grnNo+".pdf");
    }

    function printTable(){
        return(
            data.map((dataset, index) =>
                <tr key={dataset.grnNo}>
                    <td>{index+((currentPage-1)*recordsPerPage)+1}</td>
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

    function GetOneGRN(id: number){
        Services.GetOneGRN(id)
        .then(({data}) =>{
            console.log(data);
            setViewGRN(data);
        }).catch(({response})=>{
            responseManage(response);
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
        "itemName": "",
        "unit": "",
        "grnQty": 0,
        "price": 0,
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

    function handleAdd(id: string, value: string){
        const newData: any = {...addNew};
        newData[id] = value;
        setAddNew(newData);
        console.log(newData);
    }

    function handleAddCons(e: any){
        const newData: any = {...addCons};
        newData[e.target.id] = e.target.value;
        setAddCons(newData);
        console.log(newData);
    }

    function AddNewValidate(){
        const consData: any = {...addCons};
        const newData: any = {...addNew};
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
                responseManage(response);
                console.log(response);
                alert(response);
            })
        }
        else{
            alert("Validation Failed!");
        }
        
    }

    function fetchGRNCart(){
        Services.GetAllGRNCarts(Number(sessionStorage.getItem("userID")))
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
            responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function deleteFromCart(id: number){
        Services.DeleteGRNCart(id)
        .then(({data}) =>{
            console.log(data);
            var dt: any = { 
                "itemID": 0,
                "stockID": 0,
                "grnQty": 0,
                "bulckPrice": 0,
                "remarks": ""
            };
            var dts: any = [];
            dts.push(dt);
            setAddNew(dts);
            fetchGRNCart();
        }).catch(({response})=>{
            responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    function addNewGRN(){
        Services.PostGRNs(Number(sessionStorage.getItem("userID")))
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
                "itemName": "",
                "unit": "",
                "grnQty": 0,
                "price": 0,
                "payType": "",
                "bulckPrice": 0,
                "actualBulkPrice": 0,
                "grnRecorderID": 0,
                "dueDate": "",
                "remarks": ""
            }]);
            AddModelHandleClose();
        }).catch(({response})=>{
            responseManage(response);
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

    function fetchGRNData(id: number){
        Services.PostGRNs(id)
        .then(({data}) =>{
            console.log(data);
  
        }).catch(({response})=>{
            responseManage(response);
            console.log(response);
            alert(response);
        })
    }

    return(
        <>
            <div className="row">
                <p className="m-4" style={{ color: "#4d646f", fontSize: "18px", fontWeight: "600" }}>GRNs</p>
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
                            <button type="button" className="btn btnPrimary" onClick={AddModelHandleShow}><i className="bi bi-plus"></i> &nbsp; Add GRN</button>
                        </div>
                    </div>

                    <div>
                        <div className="my-2">
                            <table className="table">
                                <thead className="theadStyle">
                                    <tr className="">
                                        <th scope="col" className="text-light text-center">#</th>
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
                                                    <option defaultValue="">_</option>
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
                                                    <option defaultValue="">_</option>
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
                                                            <select className="form-select" id="itemID" onChange={(e) => {handleAdd(e.target.id, e.target.value); fetchStock(e);}} placeholder="Item">
                                                                <option defaultValue="">_</option>
                                                                {
                                                                    item.map(items => <option key={items.itemID} value={items.itemID}>{items.itemName}</option>)
                                                                }
                                                            </select>
                                                            <label htmlFor="itemID" className="form-label">Item Name</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <select className="form-select" id="stockID" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="Item">
                                                                <option defaultValue="">_</option>
                                                                {
                                                                    stock.map(stocks => <option key={stocks.stockID} value={stocks.stockID}>{stocks.price}</option>)
                                                                }
                                                            </select>
                                                            <label htmlFor="stockID" className="form-label">Stock</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id="grnQty" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0.00"/>
                                                            <label htmlFor="grnQty" className="form-label">Qty</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id="bulckPrice" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0.00"/>
                                                            <label htmlFor="bulckPrice" className="form-label">Bulck Price</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <textarea className="form-control" id="remarks" onChange={(e) => handleAdd(e.target.id, e.target.value)} placeholder="0.00"></textarea>
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
        </>
    );
}