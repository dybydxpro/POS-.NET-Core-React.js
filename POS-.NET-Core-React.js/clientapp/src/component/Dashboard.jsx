import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import SlideBar from "./SlideBar";

export default function Dashboard(){
    const navigate = useNavigate();

    useEffect(() => {
        if(!(Number(sessionStorage.getItem("userID")) > 0)){
            navigate("/login");
        }
    });

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
                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                        </nav>
                    </div>
                    


                </div>
            </div>
        </div>
    );
}