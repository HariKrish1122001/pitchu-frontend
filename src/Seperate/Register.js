import { MdMail } from "react-icons/md"; // Import your icon
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import company from "../Assets/images/company-1.png";
import { CgProfile } from "react-icons/cg";
import { IoCode } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import isEmpty from "is-empty";
import { generateSecureUserID } from "../service/GeneratId";
import { encryptData } from "../service/encrypt";
import { rigerster } from "../Api/AuthApi";
import { ToastContainer, toast } from "react-toastify";


function Register() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralId = queryParams.get("referralId");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState({});
  const [isload, setIsload] = useState(false);
  const [userRegisterData, setUserRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    referelId: null,
    conformPassword: "",
  });

  useEffect(() => {
    if (referralId) {
      setUserRegisterData((prevData) => ({
        ...prevData,
        ["referelId"]: referralId,
      }));
    } else {
      setUserRegisterData((prevData) => ({
        ...prevData,
        ["referelId"]: null,
      }));
    }
  }, [referralId]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateValues = (data, KEY) => {
    let errors = {};

    // Validate email
    if (KEY === "email" && isEmpty(data.email)) {
      errors.email = "Email is required!";
    } else if (KEY === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address!";
    }

    // Validate password
    if (KEY == "password" && isEmpty(data.password)) {
      errors.password = "Password is required!";
    } else if (KEY == "password" && data.password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
    } else if (KEY == "password" && data.password.length > 10) {
      errors.password = "Password cannot be more than 10 characters long";
    }

    // Optionally validate confirm password
    if (KEY == "conformPassword" && data.password !== data.conformPassword) {
      errors.conformPassword = "Passwords do not match!";
    }

    if (KEY == "name" && data.name === "") {
      errors.name = "Name is required!";
    } else if (KEY == "name" && !/^[A-Za-z\s]+$/.test(data.name)) {
      errors.name = "Name must contain only letters!";
    }

    if (KEY == "contact" && data.contact.length < 5) {
      errors.contact = "Contact number is required!";
    }

    if (data.referelId === "") {
      setUserRegisterData((prevData) => ({
        ...prevData,
        ["referelId"]: null,
      }));
    }
    return errors;
  };
  const validateValuestwo = (data, KEY) => {
    let errors = {};

    // Validate email
    if (isEmpty(data.email)) {
      errors.email = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address!";
    }

    // Validate password
    if (isEmpty(data.password)) {
      errors.password = "Password is required!";
    } else if (data.password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
    } else if (data.password.length > 10) {
      errors.password = "Password cannot be more than 10 characters long";
    }

    // Optionally validate confirm password
    if (data.password !== data.conformPassword) {
      errors.conformPassword = "Passwords do not match!";
    }

    if (data.name === "") {
      errors.name = "Name is required!";
    } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
      errors.name = "Name must contain only letters!";
    }

    if (data.contact.length < 5) {
      errors.contact = "Contact number is required!";
    }

    if (data.referelId === "") {
      setUserRegisterData((prevData) => ({
        ...prevData,
        ["referelId"]: null,
      }));
    }
    return errors;
  };
  const handleChange = async (e) => {
    try {
      const { name, value } = e.target;
      if (name == "name" && !/^[A-Za-z\s]+$/.test(value) && value.trim()) {
        return;
      }
      const updatedFields = { ...userRegisterData, [name]: value };
      setUserRegisterData(updatedFields);

      const fieldErrors = validateValues(updatedFields, name);
      setErrormsg((prevErrors) => ({
        ...prevErrors,
        ...fieldErrors,
        [name]: fieldErrors[name] || "",
      }));
    } catch (error) {
      console.log("HandleChange Error:", error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      let obj = {};
      if (Object.keys(data).length > 0) {
        const errors = validateValuestwo(data);
        setErrormsg(errors);
        if (Object.keys(errors).length === 0) {
          setIsload(true);
          const clientId = generateSecureUserID();
          obj = data;
          obj.clientId = clientId;
          const enData = encryptData(obj);
          const res = await rigerster(enData);
          if (res.status === true) {
            toast.success(res.message);
            setInterval(() => {
              navigate("/login");
            }, 2500);
          } else {
            toast.warn(res.message || "An error occurred during registration.");
            // setInterval(() => {
            //   window.location.reload();
            // }, 2500);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast("An unexpected error occurred. Please try again.");
      // setInterval(() => {
      //   window.location.reload();
      // }, 2500);
    }
  };

  return (
    <div className="App">
      <div className="variable-login min-vh-100  ">
        <div className="container">
          <div className="variable-inside-login min-vh-100">
            <div className="row ">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="variable-right-side min-vh-100">
                      <p className="fw-bold">
                        {" "}
                        <img className="me-3" src={company}></img>Pitchu Daily
                        Chit
                      </p>
                      <div className="variable-right-side-inside">
                        <h2 className="fw-bold">Welcome Back</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore{" "}
                        </p>
                        <div className="text-center">
                          <a href="/login">
                            <button className="register-btn">Login</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="left-side-login min-vh-100 d-block">
                      <div className="text-center">
                        <h2>Register</h2>
                        <form>
                          <div className="mb-3 position-relative-3 mt-3">
                            <CgProfile className="input-icon" />
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="exampleFormControlInput1"
                              placeholder="Name"
                              style={{ paddingLeft: "40px" }} // Ensure there's enough padding for the icon
                              value={userRegisterData.name}
                              onChange={handleChange}
                            />

                          </div>
                          {errormsg.name ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.name}
                            </span>
                          ) : null}

                          <div class="mb-3 position-relative-1 mt-3">
                            <MdMail className="input-icon" />
                            <input
                              type="email"
                              class="form-control"
                              name="email"
                              id="exampleFormControlInput1"
                              placeholder="Email id"
                              style={{ paddingLeft: "40px" }} // Adjust padding to accommodate the icon
                              value={userRegisterData.email}
                              onChange={handleChange}
                            />

                          </div>
                          {errormsg.email ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.email}
                            </span>
                          ) : null}

                          <div className="mb-3 w-100 mt-3">
                            <PhoneInput
                              country={"in"} // Set default country to India
                              name="contact"
                              id="contact"
                              value={userRegisterData.contact}
                              onChange={(value) =>
                                handleChange({
                                  target: { name: "contact", value },
                                })
                              }
                            />

                          </div>
                          {errormsg.contact ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.contact}
                            </span>
                          ) : null}

                          <div class="mb-3 position-relative-1 mt-3">
                            <IoCode className="input-icon" />
                            <input
                              type="text"
                              class="form-control"
                              name="referelId"
                              id="exampleFormControlInput1"
                              placeholder="Referral Code"
                              style={{ paddingLeft: "40px" }} // Adjust padding to accommodate the icon
                              value={userRegisterData.referelId}
                              onChange={handleChange}
                            />

                          </div>
                          {errormsg.referelId ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.referelId}
                            </span>
                          ) : null}

                          <div className="mb-3 position-relative-2 mt-3">
                            <RiLockPasswordLine className="input-icon" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="passwordInput"
                              name="password"
                              placeholder="Enter your password"
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "40px",
                              }}
                              value={userRegisterData.password}
                              onChange={handleChange}
                            />

                            <div
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </div>

                          </div>
                          {errormsg.password ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.password}
                            </span>
                          ) : null}
                          <div className="mb-3 position-relative-2 mt-3">
                            <RiLockPasswordLine className="input-icon" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="exampleFormControlInput1"
                              name="conformPassword"
                              placeholder="Confirm"
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "40px",
                              }} // Adjust padding for the icons
                              value={userRegisterData.conformPassword}
                              onChange={handleChange}
                            />

                            <div
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </div>

                          </div>
                          {errormsg.conformPassword ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.conformPassword}
                            </span>
                          ) : null}
                        </form>

                        <div className="text-center mt-4">
                          <button
                            className="log-in-btn"
                            onClick={() => {
                              handleSubmit(userRegisterData);
                            }}
                          >
                            Submit
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
      </div>
    </div>
  );
}

export default Register;
