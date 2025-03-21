import connection from "../Assets/images/Vector-2.png";
import { FaCheck } from "react-icons/fa6";
import benefit from "../Assets/images/another-1.png";
import profile from "../Assets/images/Mask-group.png";
import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import group from "../Assets/images/Mask-group-1.png";
import line from "../Assets/images/Asset-3.png";
import man from "../Assets/images/man.png";
import phone from "../Assets/images/phone-1.png";
import buttom9 from "../Assets/images/Button-9.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { getUserData } from "../service/helpers";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
// import required modules
import { Pagination } from "swiper/modules";
import { checkUserInfo, addMemberShip, getUserMembership } from "../Api/memberShipApi";
import { encryptData, decryptData } from "../service/encrypt";
import { ToastContainer, toast } from "react-toastify";
import { getisClientId } from "../Api/AuthApi";
import Toaster, { notify } from './Toaster';

function Home(props) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [refferalmembership, setRefferalMemberShip] = useState({});
  const [clientDetails, setCliendDetails] = useState([])
  const loginStatus = props;


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
        const enClientId = encryptData(clientId.clientId)
        const clienddetails = await getisClientId(enClientId);
        if (clienddetails.status == true) {
          const declienddetails = decryptData(clienddetails.data);
          setCliendDetails(declienddetails);
        }
      } else {
        setCliendDetails({});
        setUserDetails({});
      }
    } catch (error) {
      setCliendDetails({});
      setUserDetails({});
    }
  };

  const getmemberShipInRefferal = async (Id) => {
    try {
      const enData = encryptData(Id);
      const getRefferalMembership = await getUserMembership(enData);
      if (getRefferalMembership.status == true) {
        const deData = decryptData(getRefferalMembership.data);
        setRefferalMemberShip(deData);
      } else {
        setRefferalMemberShip({});
      }
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    getClientData();
  }, [loginStatus]);

  useLayoutEffect(() => {
    getClientData();
  }, []);

  useEffect(() => {
    getmemberShipInRefferal(userDetails.referelId);
  }, [userDetails.referelId])


  const paymentSubmitDomestic = async (data) => {
    try {



      if (refferalmembership.DomesticStatus === false && clientDetails.taskCompleteStatus == false) {
        return toast.warn("You can't purchase domestic membership!");
      }

      if (!userDetails || Object.keys(userDetails).length === 0) {
        navigate("/login");
        return;
      }

      const enData = encryptData(userDetails.clientId);
      const res = await checkUserInfo(enData);

      if (res.status === false) {
        return toast.warn(res.message);
      }
      const deData = decryptData(res.data);
      if (deData.UserMemberShip === 3 || deData.UserMemberShip === 1) {
        return toast.warn("You already have a membership!");
      }

      const obj = {
        method: 0,
        clientId: userDetails.clientId,
        email: deData.email,
        Domestic: data,
        DomesticStatus: true,
      };

      const enDataObj = encryptData(obj);
      const response = await addMemberShip(enDataObj);
      if (response.status == true) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/domestic");
        }, 2500);
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.warn("Payment Failed!");
    }
  };

  const paymentSubmitInternational = async (data) => {
    try {

      if (refferalmembership.InternationalStatus === false && clientDetails.taskCompleteStatus == false) {
        return toast.warn("You can't purchase international membership!");
      }

      if (!userDetails || Object.keys(userDetails).length === 0) {
        navigate("/login");
        return;
      }

      const enData = encryptData(userDetails.clientId);
      const res = await checkUserInfo(enData);

      if (res.status === false) {
        return toast.warn(res.message);
      }

      const deData = decryptData(res.data);
      if (deData.UserMemberShip === 3 || deData.UserMemberShip === 2) {
        return toast.warn("You already have a membership!");
      }

      const obj = {
        method: 1,
        clientId: userDetails.clientId,
        email: res.data.email,
        International: data,
        InternationalStatus: true,
      };

      const enDataObj = encryptData(obj);
      const response = await addMemberShip(enDataObj);
      if (response.status == true) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/international");
        }, 2500);
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.warn("Payment Failed!");
    }
  };


  return (
    <div className="App">
      {/* <Navbar loginIndication={loginIndication} /> */}
      <div>
      {/* <button onClick={() => notify("Toast is working!")}>
                Show Toast
            </button> */}
        <div className="variable-banner">
          <div className="container">
            <div className="variable-inside-banner">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="variable-right-banner">
                        <h1>
                          Unlock Your Potential with Our Revolutionary
                          Opportunity!
                        </h1>
                        <p>
                          Are you ready to change your life with a simple, yet
                          powerful system? Join our dynamic community and
                          discover a new way to earn and grow!
                        </p>
                      </div>
                    </div>
                    {/* <div className='col-lg-6'>
                                        <div className='variable-left-banner'>
                                           <img src={connection}></img>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="variable-bottom-banner">
          <div className="container">
            <div className="variable-inside-bottom-banner">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center text-white">
                    <h2>Select your Goal</h2>
                    <p className="mx-lg-5">
                      Real-life earnings examples from successful distributors.
                      Bonus structures, incentives, and advancement
                      opportunities. Potential income projections based on
                      performance.
                    </p>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-4">
                      <div className="variable-member-left">
                        <div className="first-member">
                          <h5>Domestic Membership</h5>
                          <p className="m-0">
                            Esse magna sunt pariatur culpa quis
                          </p>
                        </div>
                        <div className="second-member">
                          {Object.keys(userDetails).length > 0 ? (
                            userDetails.referelId !== "null" ? (
                              <h3 className="my-4">
                                ₹1000
                                <span>for one person</span>
                              </h3>
                            ) : (
                              <h3 className="my-4">
                                ₹1200
                                <span>for one person</span>
                              </h3>
                            )
                          ) : (
                            <h3 className="my-4">
                              ₹1200
                              <span>for one person</span>
                            </h3>
                          )}
                          <button
                            className="w-100 fw-bold"
                            onClick={() => {
                              Object.keys(userDetails).length > 0
                                ? paymentSubmitDomestic(
                                  userDetails.referelId !== "null"
                                    ? 1000
                                    : 1200
                                )
                                : navigate("/login");
                            }}
                          >
                            Get Plan
                          </button>
                        </div>
                        <div className="third-member">
                          <p className="fw-bold">Features</p>
                          <ul>
                            <li>
                              <FaCheck /> Anim magna proident
                            </li>
                            <li>
                              <FaCheck /> Voluptate labore fugiat amet{" "}
                            </li>
                            <li>
                              <FaCheck /> Cillum dolore sit cillum
                            </li>
                            <li>
                              <FaCheck /> Veniam aute mollit veniam
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="variable-member-left">
                        <div className="first-member">
                          <h5>International Membership</h5>
                          <p className="m-0">
                            Esse magna sunt pariatur culpa quis
                          </p>
                        </div>
                        <div className="second-member">
                          {Object.keys(userDetails).length > 0 ? (
                            userDetails.referelId !== "null" ? (
                              <h3 className="my-4">
                                $60<span>for one person</span>
                              </h3>
                            ) : (
                              <h3 className="my-4">
                                $65<span>for one person</span>
                              </h3>
                            )
                          ) : (
                            <h3 className="my-4">
                              $65<span>for one person</span>
                            </h3>
                          )}
                          <button
                            className="w-100 fw-bold"
                            onClick={() => {
                              Object.keys(userDetails).length > 0
                                ? paymentSubmitInternational(
                                  userDetails.referelId !== "null" ? 60 : 65
                                )
                                : navigate("/login");
                            }}
                          >
                            Get Plan
                          </button>
                        </div>
                        <div className="third-member">
                          <p className="fw-bold">Features</p>
                          <ul>
                            <li>
                              <FaCheck /> Anim magna proident
                            </li>
                            <li>
                              <FaCheck /> Voluptate labore fugiat amet{" "}
                            </li>
                            <li>
                              <FaCheck /> Cillum dolore sit cillum
                            </li>
                            <li>
                              <FaCheck /> Veniam aute mollit veniam
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="variable-swiper">
          <div className="container">
            <div className="variable-inside-swiper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dddddddddd">
                    <>
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                          },
                          768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                          },
                          1024: {
                            slidesPerView: 1,
                            spaceBetween: 50,
                          },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <div className="variable-swiper-1">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="left-swiper-1 text-start">
                                  <h2>INVESTMENTS</h2>
                                  <p>
                                    Binary Plan: Distributors recruit two people
                                    directly and then continue downline
                                    recruitment in a binary tree structure.
                                    Matrix Plan: Limits the number of recruits
                                    per level{" "}
                                  </p>
                                  <button>More Info</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="variable-swiper-1">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="left-swiper-1 text-start">
                                  <h2>INVESTMENTS</h2>
                                  <p>
                                    Binary Plan: Distributors recruit two people
                                    directly and then continue downline
                                    recruitment in a binary tree structure.
                                    Matrix Plan: Limits the number of recruits
                                    per level{" "}
                                  </p>
                                  <button>More Info</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="variable-swiper-1">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="left-swiper-1 text-start">
                                  <h2>INVESTMENTS</h2>
                                  <p>
                                    Binary Plan: Distributors recruit two people
                                    directly and then continue downline
                                    recruitment in a binary tree structure.
                                    Matrix Plan: Limits the number of recruits
                                    per level{" "}
                                  </p>
                                  <button>More Info</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="variable-benefit">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-5">
                    <div className="variable-right-benefit">
                      <img src={benefit}></img>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="variable-left-benefit">
                      <h2 className="fw-bold">Features Benefits</h2>
                      <p className="m-0">
                        Binary Plan: Distributors recruit two people directly
                        and then continue downline recruitment in a binary tree
                        structure.
                      </p>
                      <p>
                        Matrix Plan: Limits the number of recruits per level{" "}
                      </p>
                    </div>
                    <div className="row g-5">
                      <div className="col-lg-6">
                        <div className=" variable-benfit-box-1">
                          <h2 className="text-center">95%</h2>
                          <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed{" "}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className=" variable-benfit-box-2">
                          <h2 className="text-center">95%</h2>
                          <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed{" "}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className=" variable-benfit-box-2">
                          <h2 className="text-center">95%</h2>
                          <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed{" "}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className=" variable-benfit-box-2">
                          <h2 className="text-center">95%</h2>
                          <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed{" "}
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
        <div className="variable-works">
          <div className="second-variable-works">
            <div className="container">
              <div className="inside-variable-work">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="text-center fw-bold">How is it Works?</h2>
                    <div className="fffffff">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="variable-box-work">
                            <div className="profile-img">
                              <img src={profile}></img>
                            </div>
                            <p>
                              Join the Network: Start by signing up as a member.
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="variable-box-work">
                            <div className="profile-img">
                              <img src={profile}></img>
                            </div>
                            <p>
                              Invite 2 New Members: Share this exciting
                              opportunity with two people
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="variable-box-work">
                            <div className="profile-img">
                              <img src={profile}></img>
                            </div>
                            <p>
                              Shuffling and Winning: Our innovative algorithm
                              will automatically shuffle{" "}
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
        </div>
        <div className="variable-mlm">
          <div className="container">
            <div className="variable-inside-mlm">
              <div className="row">
                <div className="col-lg-12">
                  <h2 className="text-center mb-4 fw-bold fs-1 mlm-heading">
                    MLM System
                  </h2>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="variable-left-mlm">
                        <div className="variable-mlm-profile">
                          <img src={group}></img>
                        </div>
                        <h2 className="text-center">One Users</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="variable-left-mlm">
                        <div className="variable-mlm-profile">
                          <img src={line}></img>
                        </div>
                        <h2 className="text-center">Two Users</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="variable-join">
          <div className="container">
            <div className="variable-inside-join">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="variable-left-join d-flex justify-content-center">
                        <div className="ffffffffffffff">
                          <img src={man}></img>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="variable-right-join">
                        <h2 className="text-center">Why Join Us?</h2>
                        <p>
                          Simple and Easy: Just invite two people, and you're on
                          your way to success!
                        </p>
                        <p>
                          Unlimited Potential: The more people you invite, the
                          higher your chances of winning.
                        </p>
                        <p>
                          Exciting Rewards: With every shuffle, someone wins.
                          Why not let it be you? Take the First Step Today!
                        </p>
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

export default Home;
