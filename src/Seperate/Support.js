import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import support from "../Assets/images/cont-fin-1.png"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUserData } from "../service/helpers";
import { sendMessage } from "../Api/Dashboard";
import { encryptData, decryptData } from "../service/encrypt";
import { toast } from "react-toastify";

function Support(props) {
    const loginStatus = props;
    const [userDetails, setUserDetails] = useState({});
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState("");


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
                setUserDetails({});
            }
        } catch (error) {
            setUserDetails({});
        }
    };



    useLayoutEffect(() => {
        getClientData();
    }, [loginStatus]);

    useLayoutEffect(() => {
        getClientData();
    }, []);


    const handleSumit = async () => {
        try {
            if (Object.keys(userDetails).length === 0) {
                toast.warn("You need to log in first!");
                return;
            }

            if (!message || message.trim().length === 0) {
                setErrorMsg("Give correct content.");
                return;
            }
            
            if (message.length <= 50) {
                setErrorMsg("Message must be at least 50 characters long.");
                return;
            }

            const obj = {
                clientId: userDetails.clientId,
                text: message
            };

            const en = encryptData(obj);
            const res = await sendMessage(en);

            if (res.status) {
                toast.success("Message sent successfully!");
            } else {
                toast.error("Message sending failed. Please try again!");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const handleChange = async (e) => {
        try {
            setErrorMsg("");
            if (e.length <= 50 && e.length !==0) {
                setErrorMsg("Message must be at least 50 characters long.");
            }
            setMessage(e);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='App'>
            {/* <Navbar /> */}
            <div>
                <div className='variable-support'>
                    <div className='container'>
                        <div className='variable-inside-support'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='row align-items-center justify-content-between'>
                                        <div className='col-lg-6'>
                                            <div className='variable-left-support'>
                                                <h2 className='fw-bold fs-1 '>Say hello and let's work together!</h2>
                                                <div class="mb-3 mt-3">
                                                    <label for="exampleFormControlInput1" class="form-label fw-bold">User ID</label>
                                                    <input type="name" class="form-control" id="exampleFormControlInput1" placeholder="" value={userDetails.clientId} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlTextarea1" class="form-label fw-bold">Message</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={message} placeholder='message '
                                                        onChange={(e) => { handleChange(e.target.value); }
                                                        }></textarea>
                                                </div>
                                                {errorMsg.length > 0 ? <p style={{ color: "red" }}>{errorMsg}</p> : ""}

                                                <div className='mt-2'>
                                                    <button className='confirm-btn' onClick={() => { handleSumit() }}>Submit <FaArrowLeftLong /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-5'>
                                            <div className='variable-right-support mt-3 mt-lg-0'>
                                                <img src={support}></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Support