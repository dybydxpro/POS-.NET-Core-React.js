import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import dp1 from '../image/profile.png';

export default function SlideBar(){
    const navigate = useNavigate();

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            alert("Please login to the system!");
            navigate("/login");
        }
    }, [sessionStorage.getItem("token")]);

    function logout(){
        sessionStorage.setItem('userID', 0);
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
        <div style={{position: "relative"}}>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-light" style={{minHeight: "100vh", backgroundColor: "#4d646f"}}>
                <a href="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none  text-center">
                    <span className="fs-4 text-light">POS System</span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto mx-3">
                    {/*<li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed text-light" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                        Home
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="/dashboard" className="link-light rounded">Overview</a></li>
                                <li><a href="/dashboard" className="link-dark rounded">Updates</a></li>
                                <li><a href="/dashboard" className="link-dark rounded">Reports</a></li>
                            </ul>
                        </div>
                    </li>*/}
                    <li>
                        <a href="/dashboard" className="nav-link link-dark text-light">
                            <i className="bi bi-grid"></i> &nbsp; Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/user" className="nav-link link-dark text-light">
                            <i className="bi bi-person"></i> &nbsp; Users
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/item" className="nav-link link-dark text-light">
                            <i className="bi bi-box"></i> &nbsp; Items
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/stock" className="nav-link link-dark text-light">
                            <i className="bi bi-grid-1x2"></i> &nbsp; Stocks
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/supplier" className="nav-link link-dark text-light">
                            <i className="bi bi-people"></i> &nbsp; Suppliers
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/grn" className="nav-link link-dark text-light">
                            <i className="bi bi-box-arrow-in-left"></i> &nbsp; GRNs
                        </a>
                    </li>
                    <hr/>
                    <li>
                        <a href="/dashboard/bill" className="nav-link link-dark text-light">
                            <i className="bi bi-receipt-cutoff"></i> &nbsp; Billing
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/return" className="nav-link link-dark text-light">
                            <i className="bi bi-bootstrap-reboot"></i> &nbsp; Returns
                        </a>
                    </li>
                </ul>
                <hr/>
                <div className="dropdown">
                    <a href="/" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={dp1} alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>{sessionStorage.getItem('userName')}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        {/*<li><a className="dropdown-item" href="/">New project...</a></li>
                        <li><a className="dropdown-item" href="/">Settings</a></li>*/}
                        <li><span className="dropdown-item" onClick={handleShow}><i className="bi bi-person-badge"></i>&nbsp; Profile</span></li>
                        <Offcanvas show={showOffCanvas} onHide={handleClose} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>User Profile</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <img src={dp1} alt="" width="250" height="250" className="rounded-circle me-2"/>
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
    );
}