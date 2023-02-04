import React, { useEffect } from 'react';

export default function NavBar(){
    useEffect(() => {
        if((Number(sessionStorage.getItem("userID")) > 0) || (sessionStorage.getItem("userID") === undefined)){
            sessionStorage.setItem('userID', String(0));
        }
        if((String(sessionStorage.getItem("userName")) == "") || (sessionStorage.getItem("userName") === undefined)){
            sessionStorage.setItem('userID', "");
        }
        if((String(sessionStorage.getItem("type")) == "") || (sessionStorage.getItem("type") === undefined)){
            sessionStorage.setItem('type', "");
        }
    }, []);

    return(
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">POS System</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {/*<li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown07" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                                <ul className="dropdown-menu" aria-labelledby="dropdown07">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>*/}
                        </ul>
                        <form>
                            <a href="/login" className="btn btn-warning">System</a>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}