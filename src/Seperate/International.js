import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import setting from "../Assets/images/Asset-13.png";
import phone from "../Assets/images/phone-1.png";
import buttom9 from "../Assets/images/Button-9.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUserData } from "../service/helpers";
import { getisClientId } from "../Api/AuthApi";
import { findUserdataInternational } from "../Api/Dashboard";
import { InternationalPlanUserAdd } from "../Api/InternationalApi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { checkUserInfo } from "../Api/memberShipApi";
import { internationalGetPlans } from "../Api/Dashboard";
import { encryptData, decryptData } from "../service/encrypt";
import { DollerPrice } from "../Api/InternationalApi";
import { format } from "date-fns";

function International(props) {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [DollerStatus, setDollerStatus] = useState(false);
  const [Doller, setDoller] = useState(0);
  const [High, setHigh] = useState(0);
  const [Low, setLow] = useState(0);
  const [Medium, setMedium] = useState(0);
  const loginStatus = props;
  const [referralPlan, setreferralplan] = useState([]);
  const [clientDetails, setCliendDetails] = useState([])
  const [interPlans, setinterPlans] = useState({});


  const getPlan = async () => {
    try {
      const res = await internationalGetPlans();
      if (res.status === true) {
        const en = decryptData(res.data);
        setinterPlans(en[0])
      }
    } catch (error) {
      console.log(error)
    }
  }


  useLayoutEffect(() => {
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
        const referralInternationalplan = await findUserdataInternational(en);
        if (referralInternationalplan.status === true) {
          const de = decryptData(referralInternationalplan.data);
          setreferralplan(de);
        }
        const enClientId = encryptData(clientId.clientId)
        const clienddetails = await getisClientId(enClientId);
        if (clienddetails.status == true) {
          const declienddetails = decryptData(clienddetails.data);
          setCliendDetails(declienddetails);
        }
      } else {
        setUserDetails({});
        setreferralplan({});
        setCliendDetails({});
      }
    } catch (error) {
      setUserDetails({});
      setreferralplan({});
      setCliendDetails({});
    }
  };

  const DollerPriceFetch = async () => {
    try {
      if (DollerStatus == false) {
        const responce = await DollerPrice();
        if (responce.status == true) {
          setDoller(responce.data);
          setDollerStatus(true);
        } else {
          setDoller(0);
        }
      }
    } catch (error) {
      console.error("Error fetching dollar price:", error);
    }
  };

  useLayoutEffect(() => {
    getClientData();
    DollerPriceFetch();
  }, []);

  useLayoutEffect(() => {
    getClientData();
  }, [loginStatus]);



  const setPrice = () => {
    try {
      if (Doller !== 0) {
        const h = (Object.keys(interPlans).length>0?interPlans.High:0) / Doller;
        const l = (Object.keys(interPlans).length>0?interPlans.Low:0) / Doller;
        const m = (Object.keys(interPlans).length>0?interPlans.Medium:0) / Doller;
        setHigh(Math.ceil(h));
        setLow(Math.ceil(l));
        setMedium(Math.ceil(m));
      }
    } catch (error) {
      console.log(error);
    }
   
  };
  useEffect(() => {
    setPrice();
  }, [Doller]);

  const handelClick = async (data, type) => {
    try {
      if (!userDetails || Object.keys(userDetails).length === 0) {
        navigate("/login");
        return;
      }
      const findBuyPlan = referralPlan.filter(i => i.amountType === type);
      if (clientDetails.taskCompleteStatus == false && findBuyPlan.length === 0) {
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
      const response = await InternationalPlanUserAdd(enDataObj);
      if (response.status == true) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/route3");
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
                  <div className="text-center">
                    <h2 className="fw-bold">International Plan</h2>
                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore{" "}
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <div className="variable-box-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <p>Minimum Amount</p>
                          <MdArrowOutward />
                        </div>

                        <h2>$ {Low}</h2>
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
                                ? handelClick(Low, "Low")
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

                        <h2>$ {Medium}</h2>
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
                                ? handelClick(Medium, "Medium")
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

                        <h2>$ {High}</h2>
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
                                ? handelClick(High, "High")
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

export default International;
