import React, { useEffect, useState,useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import company from "../Assets/images/company-1.png"
import $ from "jquery";
import { NavLink } from 'react-router-dom';
import { getUserData } from "../service/helpers";
import { getisClientId } from "../Api/AuthApi";
import { encryptData, decryptData } from "../service/encrypt";



function Navbar(props) {
    const { loginIndication } = props;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [clientDetails, setCliendDetails] = useState([]);

    const CheckTokenExpired = async () => {
        try {
            const userData = await getUserData();
            if (userData !== null) {
                setUserDetails(userData);
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
                const enClientId = encryptData(clientId.clientId)
                const clienddetails = await getisClientId(enClientId);
                if (clienddetails.status == true) {
                    const declienddetails = decryptData(clienddetails.data);
                    setCliendDetails(declienddetails);
                }
            } else {
                setUserDetails({});
            }
        } catch (error) {
            setUserDetails({});
        }
    };

    useLayoutEffect(() => {
        getClientData();
    }, []);

    return (
        <div className='App'>
            <div className='variable-navbar'>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand fw-bold" href="/"><img className='me-2' src={company}></img>Pitchu Daily Chit</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/domestic" activeClassName="active">Domestic</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/international" activeClassName="active">International</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/support" activeClassName="active">Support</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/faq" activeClassName="active">FAQ</NavLink>
                                </li>
                            </ul>
                            <form className="d-lg-flex" role="search">
                                {
                                    Object.keys(userDetails).length > 0 ?
                                        <>
                                            <div className="variable-btn " style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                                <p className="nav-item p-0 mb-0">Hii &nbsp;{clientDetails?.name || "Guest"}</p>
                                                <div>
                                                    <button
                                                        className="variable-btn active"
                                                        style={{ background: "#EEB729", border: "#EEB729" }}
                                                        type="button"
                                                        onClick={() => {
                                                            navigate("/route2");
                                                        }}
                                                    >
                                                        Dashboard
                                                    </button>
                                                </div>

                                            </div>


                                            <button
                                                className="variable-btn active mt-lg-0 mt-3"
                                                style={{ background: "red", border: "1px solid red" }}
                                                type="button"
                                                onClick={() => {
                                                    console.log("Logged out successfully!");
                                                    localStorage.removeItem("pitchuToken");
                                                    setUserDetails({});
                                                    loginIndication(false);
                                                }}
                                            >
                                                Log Out
                                            </button>
                                        </>
                                        : <>
                                            <Link to="/login">
                                                <button className="variable-btn active" type="button">Log In</button>
                                            </Link>
                                            <Link to="/register">
                                                <button className="variable-btn" type="button">Register</button>
                                            </Link>
                                        </>

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