import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import dp1 from '../image/profile.png';

export default function SlideBar(){
    const navigate = useNavigate();

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            alert("Please login to the system!");
            navigate("/login");
        }
    });

    function logout(){
        sessionStorage.setItem('userID', 0);
        sessionStorage.setItem('userName', "");
        sessionStorage.setItem('type', "");
        navigate("/");
    }
    
    return(
        <div>
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
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/user" className="nav-link link-dark text-light">
                            Users
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/item" className="nav-link link-dark text-light">
                            Items
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
                        <li><a className="dropdown-item" href="/">New project...</a></li>
                        <li><a className="dropdown-item" href="/">Settings</a></li>
                        <li><a className="dropdown-item" href="/">Profile</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><span className="dropdown-item" onClick={() => logout()}>Sign out</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}