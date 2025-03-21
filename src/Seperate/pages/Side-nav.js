import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { getUserData } from "../../service/helpers";
import { Link, useNavigate } from "react-router-dom";
import { userInfo } from "../../Api/AuthApi";
import { encryptData, decryptData } from "../../service/encrypt";
import render from "../../Assets/images/company-1.png"

function Sidenav() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [referral, setReferral] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  const closeSidenav = () => {
    setIsOpen(false);
  };

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
      if (!clientId || Object.keys(clientId).length === 0) {
        navigate("/login");
      }
      const enData = encryptData(clientId.clientId);
      const res = await userInfo(enData);
      if (res.status == true) {
        const userDetails = decryptData(res.data);
        setUserDetails(userDetails[0]);
        setReferral(
          `http://localhost:3000/register?referralId=${userDetails[0].clientId}`
        );
      }
    } catch (error) {
      setUserDetails({});
    }
  };

  useLayoutEffect(() => {
    getClientData();
  }, []);

  const handleCopy = (num) => {
    if (num == 1) {
      navigator.clipboard
        .writeText(userDetails.clientId)
        .then(() => {
          alert("User Id copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy User Id :", error);
        });
    } else {
      navigator.clipboard
        .writeText(referral)
        .then(() => {
          alert("Referral code copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy referral code:", error);
        });
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div className="toggle-icon" onClick={toggleSidenav}>
          {isOpen ? <IoMdClose /> : <TfiAlignJustify />}
        </div>
      </div>

      <div className={`sidenav ${isOpen ? "open" : ""}`}>
        <div
          className="nav flex-column nav-pills  min-vh-100 p-4"
          role="tablist"
          aria-orientation="vertical"
        >
          <div className="close-icon" onClick={closeSidenav}>
            <div className="text-end">
              <IoMdClose />
            </div>
          </div>
          <div className="variable-dadhboard-title ">
            <div className="d-flex flex-row pt-2 mb-2 text-center">
              <div className="mx-auto  text-lign-center">
                <a
                  className="navbar-brand"
                  href="/"
                  style={{ color: "#2b6d00", fontWeight: "bold" }}
                >
                  <img src={render}></img> Pitchu Daily Chit
                </a>
              </div>
            </div>
            <h2 className="text-center">
              {" "}
              {Object.keys(userDetails).length > 0 ? userDetails.name : ""}
            </h2>
            <p>
              {Object.keys(userDetails).length > 0 ? userDetails.email : ""}{" "}
            </p>
            <form>
              <div className="mb-3 position-relative-copy">
                <div className="d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label text-end"
                  >
                    <span className="fw-bold">User Id:</span>{" "}
                    {Object.keys(userDetails).length > 0
                      ? userDetails.clientId
                      : ""}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(1)}
                    title="Copy User ID"
                    className="btn btn-ico border-0"
                  >
                    <FaRegCopy className="input-icon-copy" />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="referralCode"
                  className="form-label text-end fw-bold"
                >
                  Referral Code
                </label>

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="referralCode"
                    value={referral}
                    placeholder="Referral code"
                    readOnly
                  />
                  <span
                    className="input-group-text"
                    onClick={() => {
                      handleCopy(0);
                    }}
                  >
                    <FaRegCopy className="input-icon-copy" />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <a
            href="/route2"
            className="nav-link btn route2-active text-dark"
            type="button"
          >
            Domestic
          </a>
          <a
            href="/route3"
            className="nav-link btn route3-active text-dark"
            type="button"
          >
            International
          </a>
          {/* <a
            href="/dashboard-notification"
            className="nav-link btn route4-active text-dark"
            type="button"
          >
            Notification
          </a>
          <a
            href="/transaction-history"
            className="nav-link btn route5-active text-dark"
            type="button"
          >
            Transactionhistory
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
