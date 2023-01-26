import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';

import * as images from '../assets/image/images';
import Dashboard from "./Dashboard";
import User from "./User";
import Item from "./Item";
import Stock from "./Stock";
import Supplier from "./Supplier";
import GRN from "./GRN";
import Bill from "./Bill";
import Return from "./Return";
import BillFullScrean from "./BillFullScrean";

export default function Common(){
    const navigate = useNavigate();
    const [shift, setShift] = useState(0);
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            alert("Please login to the system!");
            navigate("/login");
        };
        setInterval(() => setDateState(new Date()), 1000);
    }, [sessionStorage.getItem("token")]);

    function logout(){
        sessionStorage.setItem('userID', String(0));
        sessionStorage.setItem('userName', "");
        sessionStorage.setItem('type', "");
        sessionStorage.setItem('token', "");
        navigate("/");
    }

    //
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleClose = () => setShowOffCanvas(false);
    const handleShow = () => setShowOffCanvas(true);

    return(
        <>
            {
                shift != 10 && <div className="container-fluid" style={{ overflow: "hidden" }}>
                    <div className="row">
                        <div className="col-2" style={{backgroundColor: "#03053B", height: "100vh"}}>
                            <div className="d-flex flex-column flex-shrink-0 p-3 text-light" style={{minHeight: "100vh", backgroundColor: "#03053B"}}>
                                <a href="/system" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none  text-center">
                                    <span className="fs-4 text-light">POS System</span>
                                </a>
                                <hr/>
                                <ul className="nav nav-pills flex-column mb-auto mx-3">
                                    <li className={ shift==0? "navSelect": ""}>
                                        <div onClick={() => setShift(0)} className="nav-link link-dark text-light">
                                            <i className="bi bi-grid"></i> &nbsp; Dashboard
                                        </div>
                                    </li>
                                    <li className={ shift==1? "navSelect": ""}>
                                        <div onClick={() => setShift(1)} className="nav-link link-dark text-light">
                                            <i className="bi bi-person"></i> &nbsp; Users
                                        </div>
                                    </li>
                                    <li className={ shift==2? "navSelect": ""}>
                                        <div onClick={() => setShift(2)} className="nav-link link-dark text-light">
                                            <i className="bi bi-box"></i> &nbsp; Items
                                        </div>
                                    </li>
                                    <li className={ shift==3? "navSelect": ""}>
                                        <div onClick={() => setShift(3)} className="nav-link link-dark text-light">
                                            <i className="bi bi-grid-1x2"></i> &nbsp; Stocks
                                        </div>
                                    </li>
                                    <li className={ shift==4? "navSelect": ""}>
                                        <div onClick={() => setShift(4)} className="nav-link link-dark text-light">
                                            <i className="bi bi-people"></i> &nbsp; Suppliers
                                        </div>
                                    </li>
                                    <li className={ shift==5? "navSelect": ""}>
                                        <div onClick={() => setShift(5)} className="nav-link link-dark text-light">
                                            <i className="bi bi-box-arrow-in-left"></i> &nbsp; GRNs
                                        </div>
                                    </li>
                                    <hr/>
                                    <li className={ shift==6? "navSelect": ""}>
                                        <div onClick={() => setShift(6)} className="nav-link link-dark text-light">
                                            <i className="bi bi-receipt-cutoff"></i> &nbsp; Billing
                                        </div>
                                    </li>
                                    <li className={ shift==7? "navSelect": ""}>
                                        <div onClick={() => setShift(7)} className="nav-link link-dark text-light">
                                            <i className="bi bi-bootstrap-reboot"></i> &nbsp; Returns
                                        </div>
                                    </li>
                                </ul>
                                <hr/>
                                <div className="dropdown">
                                    <a href="/" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={images.profile} alt="" width="32" height="32" className="rounded-circle me-2"/>
                                        <strong>{sessionStorage.getItem('userName')}</strong>
                                    </a>
                                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                        <li><span className="dropdown-item" onClick={handleShow}><i className="bi bi-person-badge"></i>&nbsp; Profile</span></li>
                                        <Offcanvas show={showOffCanvas} onHide={handleClose} placement="end">
                                            <Offcanvas.Header closeButton>
                                                <Offcanvas.Title>User Profile</Offcanvas.Title>
                                            </Offcanvas.Header>
                                            <Offcanvas.Body>
                                                <div>
                                                    <div className="d-flex justify-content-center">
                                                        <img src={images.profile} alt="" width="250" height="250" className="rounded-circle me-2"/>
                                                    </div>
                                                    <div className="px-3 py-5">
                                                        <div className="row">
                                                            <div className="col-5"><p style={{fontSize: "20px"}}>User ID: </p></div>
                                                            <div className="col"><p style={{fontSize: "20px"}}>{sessionStorage.getItem('userID')}</p></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-5"><p style={{fontSize: "20px"}}>User Name: </p></div>
                                                            <div className="col"><p style={{fontSize: "20px"}}>{sessionStorage.getItem('userName')}</p></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-5"><p style={{fontSize: "20px"}}>User Type: </p></div>
                                                            <div className="col"><p style={{fontSize: "20px"}}>{sessionStorage.getItem('type')}</p></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><span className="dropdown-item" onClick={() => logout()}><i className="bi bi-box-arrow-right"></i>&nbsp; Sign out</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{ backgroundColor: "#f5f5f5" }}>
                            <div className="row" style={{ backgroundColor: "#03053B" }}>
                                <div className="d-flex justify-content-end p-3">
                                    <div style={{ minWidth: "250px", color: "white", fontSize: "18px"}}>
                                        <div className="d-flex">
                                            <i className="bi bi-calendar2-week"></i> &nbsp; { dateState.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric',})} &nbsp;
                                            <i className="bi bi-alarm"></i> &nbsp; { dateState.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, })} &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="shadow bg-white rounded mx-2 my-3 p-2" style={{ maxHeight: "89vh", minHeight: "89vh", overflowY: "auto" }}>
                                    <div style={{ margin: "10px"}}>
                                        {
                                            shift == 0 && <Dashboard/>
                                        }
                                        {
                                            shift == 1 && <User/>
                                        }
                                        {
                                            shift == 2 && <Item/>
                                        }
                                        {
                                            shift == 3 && <Stock/>
                                        }
                                        {
                                            shift == 4 && <Supplier/>
                                        }
                                        {
                                            shift == 5 && <GRN/>
                                        }
                                        {
                                            shift == 6 && <>
                                                <Bill/>
                                                <button type="button" className="btn text-light btnFloating" style={{position:"fixed", width:"60px", height:"60px", bottom:"40px", right:"40px", borderRadius: "50%", fontSize:"28px"}} onClick={() => setShift(10)}>
                                                    <i className="bi bi-arrows-angle-expand"></i>
                                                </button>
                                            </>
                                        }
                                        {
                                            shift == 7 && <Return/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                shift == 10 && <>
                    <BillFullScrean/>
                    <button type="button" className="btn text-light btnFloating" style={{position:"fixed", width:"60px", height:"60px", bottom:"40px", right:"40px", borderRadius: "50%", backgroundColor: "#648FA4", fontSize:"28px"}} onClick={() => setShift(6)}>
                        <i className="bi bi-arrows-angle-contract"></i>
                    </button>
                </>
            }            
        </>
    );
}