import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import setting from "../Assets/images/Asset-13.png";
import phone from "../Assets/images/phone-1.png";
import buttom9 from "../Assets/images/Button-9.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUserData } from "../service/helpers";
import { DomesticsPlanUserAdd } from "../Api/DomesitApi";
import { DomesticGetPlans } from "../Api/Dashboard";
import { getisClientId } from "../Api/AuthApi";
import { findUserdata } from "../Api/Dashboard"
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { checkUserInfo } from "../Api/memberShipApi";
import { encryptData, decryptData } from "../service/encrypt";
import axios from "axios";
import config from "../config/config";
import { format } from "date-fns";

function Domestic(props) {
  const navigate = useNavigate();
  const loginStatus = props;
  const [userDetails, setUserDetails] = useState({});
  const [refferBackage, setRefferBackage] = useState([]);
  const [clientDetails, setCliendDetails] = useState([]);
  const [domesticPlans, setDomesticPlans] = useState({});


  const getPlan = async () => {
    try {
      const res = await DomesticGetPlans();
      if (res.status === true) {
        const en = decryptData(res.data);
        setDomesticPlans(en[0])
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getPlan()
  }, [])


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
        const en = encryptData(clientId.referelId);
        const refferalDomestic = await findUserdata(en);
        if (refferalDomestic.status == true) {
          const de = decryptData(refferalDomestic.data);
          setRefferBackage(de);
        }
        const enClientId = encryptData(clientId.clientId)
        const clienddetails = await getisClientId(enClientId);
        if (clienddetails.status == true) {
          const declienddetails = decryptData(clienddetails.data);
          setCliendDetails(declienddetails);
        }
      } else {
        setUserDetails({});
        setRefferBackage({});
        setCliendDetails({});
      }
    } catch (error) {
      setUserDetails({});
      setRefferBackage({});
      setCliendDetails({});
    }
  };



  useLayoutEffect(() => {
    getClientData();
  }, [loginStatus]);

  useLayoutEffect(() => {
    getClientData();
  }, []);


  const handelClick = async (data, type) => {
    try {

      if (!userDetails || Object.keys(userDetails).length === 0) {
        navigate("/login");
        return;
      }

      const filter = refferBackage.filter(i => i.amountType === type);

      if (clientDetails.taskCompleteStatus == false && filter.length === 0) {
        return toast.warn("You can't allow this plan.");
      }

      const enData = encryptData(userDetails.clientId);
      const res = await checkUserInfo(enData);
      if (res.status === false) {
        toast.warn(res.message);
        setTimeout(() => {
          navigate("/");
        }, 2500);
        return;
      }

      const deData = decryptData(res.data);
      if (deData.UserMemberShip === 0) {
        return toast.warn("You can have a membership!");
      }
      const obj = {
        amountType: type,
        clientId: userDetails.clientId,
        clientReferelId: userDetails.referelId,
        email: deData.email,
        amount: data,
      };

      const enDataObj = encryptData(obj);
      const response = await DomesticsPlanUserAdd(enDataObj);
      if (response.status == true) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/route2");
        }, 2500);
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.warn("Payment Failed!");
    }
  };

  return (
    <div className="App">
      {/* <Navbar loginIndication={loginIndication} /> */}
      <div>
        <div className="variable-domestic">
          <div className="container">
            <div className="variable-inside-domestic">
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="fw-bold">Domestic Plan</h2>
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore{" "}
                  </p>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="variable-box-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <p>Minimum Amount</p>
                          <MdArrowOutward />
                        </div>

                        <h2>₹ {Object.keys(domesticPlans).length>0?domesticPlans.Low:0}</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore{" "}
                        </p>
                        <div className="text-end">
                          <button
                            className="domestic-btn"
                            onClick={() => {
                              Object.keys(userDetails).length > 0
                                ? handelClick(25000, "Low")
                                : navigate("/login");
                            }}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="variable-box-1 variable-second-box">
                        <div className="d-flex justify-content-between align-items-start">
                          <p>Minimum Amount</p>
                          <MdArrowOutward />
                        </div>

                        <h2>₹ {Object.keys(domesticPlans).length>0?domesticPlans.Medium:0}</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore{" "}
                        </p>
                        <div className="text-end">
                          <button
                            className="domestic-btn"
                            onClick={() => {
                              Object.keys(userDetails).length > 0
                                ? handelClick(50000, "Medium")
                                : navigate("/login");
                            }}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="variable-box-1  variable-third-box">
                        <div className="d-flex justify-content-between align-items-start">
                          <p>Minimum Amount</p>
                          <MdArrowOutward />
                        </div>

                        <h2>₹ {Object.keys(domesticPlans).length>0?domesticPlans.High:0}</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore{" "}
                        </p>
                        <div className="text-end">
                          <button
                            className="domestic-btn"
                            onClick={() => {
                              Object.keys(userDetails).length > 0
                                ? handelClick(100000, "High")
                                : navigate("/login");
                            }}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="variable-banner-domestic">
          <div className="container">
            <div className="variable-inside-banner-domestic">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="variable-left-domestic">
                        <img src={setting}></img>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="variable-right-domestic">
                        <h2 className="fw-bold">How it Work?</h2>
                        <div className="">
                          <h5 className="fw-bold">
                            1.Membership & Joining Fee
                          </h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo
                          </p>
                        </div>
                        <div className="">
                          <h5 className="fw-bold">2.Earnings Structure</h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo
                          </p>
                        </div>
                        <div className="">
                          <h5 className="fw-bold">3.Returns & Cancellations</h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="variable-bottom-banner-1">
          <div className="container">
            <div className="variable-inside-bottom-banner-1">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="bottom-left-1">
                        <h2>Looking for something</h2>
                        <p>Subscribe to our newsletter</p>
                        <form class="row g-3">
                          <div class="col-auto">
                            <label for="inputPassword2" class="visually-hidden">
                              Password
                            </label>
                            <input
                              type="password"
                              class="form-control"
                              id="inputPassword2"
                              placeholder="Your email address "
                            />
                          </div>
                          <div class="col-auto">
                            <button type="submit" class="confirm-btn mb-3">
                              Confirm identity
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="bottom-right-1">
                        <img className="first-img-phone" src={phone}></img>
                        <div className="variable-icon-img">
                          <img src={buttom9}></img>
                        </div>
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
  );
}

export default Domestic;
