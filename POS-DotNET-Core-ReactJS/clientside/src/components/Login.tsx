import React, { useState } from "react";
import Services from '../Services';
import NavBar from "./NavBar";

import * as images from '../assets/image/images';

import { LoginType } from "../models/Login";
// import { loginFunction } from "../controllers/LoginController";

export default function Login(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        var data: LoginType = {
            userName: userName,
            password: password
        }

        Services.login(data)
        .then(({data})=>{
            sessionStorage.setItem('userID', data.userID);
            sessionStorage.setItem('userName', data.userName);
            sessionStorage.setItem('type', data.type);
            sessionStorage.setItem('token', data.token);
            window.location.replace("/system");
        }).catch(({response})=>{
            console.log(response);
        });
    }

    return(
        <div style={{height: "100vh", backgroundColor: "#eee"}}>
            <NavBar/>
            <div>
                <section className="login-gradient-form">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-xl-10">
                                <div className="card rounded-3 text-black">
                                    <div className="row g-0">
                                        <div className="col-lg-6">
                                            <div className="card-body p-md-5 mx-md-4">
                                                <div className="text-center">
                                                    <img src={images.profile} style={{width: "185px"}} alt="logo"/>
                                                    <h4 className="mt-4 mb-3 pb-1">Point of Sales System</h4>
                                                </div>

                                                <form>
                                                    <p className="text-center">Please login to your account</p>
                                                    <div className="form-floating mb-4">
                                                        <input type="text" id="UserName" className="form-control" placeholder="User Name" onChange={(e) => setUserName(e.target.value)}/>
                                                        <label className="form-label" htmlFor="UserName">User Name</label>
                                                    </div>
                                                    <div className="form-floating mb-4">
                                                        <input type="password" id="Password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                                        <label className="form-label" htmlFor="Password">Password</label>
                                                    </div>
                                                    <div className="text-center pt-1 mb-5 pb-1">
                                                        <button className="btn login-gradient-custom-2 mb-3 px-5 text-light" type="button" onClick={() => login()}>Login</button>
                                                        {/*<a className="text-muted" href="#!">Forgot password?</a>*/}
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center login-gradient-custom-2">
                                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                                <h4 className="mb-4">We are more than just a company</h4>
                                                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}