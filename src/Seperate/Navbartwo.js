import React, { useEffect, useState, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import company from "../Assets/images/company-1.png"
import $ from "jquery";
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserData } from "../service/helpers";

function Navbar(props) {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({});

    const CheckTokenExpired = async () => {
        try {
            const userData = await getUserData();
            if (userData !== null) {
                return userData;
            } else {
                return null;
            }
        } catch (error) {
            console.log("error", error);
            return null;
        }
    };

    const getClientData = async () => {
        try {
            const clientId = await CheckTokenExpired();
            if (clientId !== null) {
                setUserDetails(clientId);
            } else {
                navigate("/login")
                setUserDetails({});
            }
        } catch (error) {
            navigate("/login")
            setUserDetails({});
        }
    };

    useLayoutEffect(() => {
        getClientData();
    }, []);

    const handelLogout = () => {
        try {
            console.log("Logged out successfully!");
            localStorage.removeItem("pitchuToken");
            setUserDetails({})
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='App'>
            <div className='variable-navbar'>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand fw-bold" href="/">My Dashboard</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/route2" activeClassName="active">Domestic</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/route3" activeClassName="active">International</NavLink>
                                </li>

                            </ul>
                    
                            <form className="d-flex" role="search">
                                {
                                    Object.keys(userDetails).length > 0 ?
                                        <button className="variable-btn active" style={{ background: "red", border: "1px solid red" }} type="button" onClick={() => {
                                            handelLogout()
                                        }}>Log Out</button>
                                        : <></>
                                }

                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar