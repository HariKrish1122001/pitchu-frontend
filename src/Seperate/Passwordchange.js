import { MdMail } from "react-icons/md"; // Import your icon
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import company from "../Assets/images/company-1.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import isEmpty from "is-empty";
import { getisClient, changePassword } from "../Api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { encryptData, decryptData } from "../service/encrypt";
import { CheckTokenIslogin } from "../service/helpers";

function Passwordchange() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState({});
  const [isload, setIsload] = useState(false);
  const [inputfields, setInputfield] = useState({
    email: "",
    password: "",
    conformPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateValues = (inputValues) => {
    const errors = {};
    const { email, password, conformPassword } = inputValues;
    // Validate email
    if (isEmpty(email)) {
      errors.email = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address!";
    }
    // Validate password
    if (isEmpty(password)) {
      errors.password = "Password is required!";
    } else if (password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }
    // Validate confirm password
    if (isEmpty(conformPassword)) {
      errors.conformPassword = "Confirm Password is required!";
    } else if (password && password !== conformPassword) {
      errors.conformPassword = "Passwords do not match!";
    }

    return errors;
  };

  const HandleChange = async (e) => {
    try {
      const { name, value } = e.target;
      const updatedFields = { ...inputfields, [name]: value };
      setInputfield(updatedFields);

      const fieldError = validateValues(updatedFields); // Validate all fields
      setErrormsg(fieldError); // Set all errors at once
    } catch (error) {
      console.error("HandleChange Error:", error);
    }
  };

  const handlePassWordChange = async (data) => {
    try {
      const errors = validateValues(data);
      setErrormsg(errors);
      if (token == null) {
        toast.warn("Conform password Failed!");
        return;
      }
      let obj = { ...data };
      if (Object.keys(errors).length === 0) {
        setIsload(true);
        obj.token = token;
        const enData = encryptData(obj);
        const responce = await getisClient(enData);
        if (responce.status === true) {
          const res = await changePassword(enData);
          if (res.status === true) {
            toast.success(res.message);
            setInterval(() => {
              navigate("/login");
             }, 2500);
          } else {
            toast.warn(res.message);
          }
        } else {
          toast.warn(responce.message);
        }
        // if (response.status === true) {
        //   toast.success("Login Sucessfully!");
        //   localStorage.setItem("pitchuToken", response.data);
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 3500);
        //   setIsload(false);
        // } else if (response.message === "data is not found!") {
        //   setIsload(false);
        //   toast.warn("Please check your email");
        // } else if (response.message === "Invalid password") {
        //   setIsload(false);
        //   toast.warn("Please check your password");
        // } else if (response.message === "Please Enter Otp") {
        //   setIsload(false);
        //   toast.error("Otp Generate is fail!");
        // } else {
        //   toast.error("Err Login failed");
        //   setIsload(false);
        // }
      }
    } catch (error) {
      console.log("HandleLogin Error:", error);
      setIsload(false);
    }
  };

  return (
    <div className="App">
      <div className="variable-login min-vh-100  justify-content-center align-items-center d-flex">
        <div className="container">
          <div className="variable-inside-login">
            <div className="row justify-content-center align-items-center d-flex">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="left-side-login min-vh-100">
                      <div className="text-center">
                        <h2>Confrom passord</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore{" "}
                        </p>
                        <form>
                          <div class="mb-3 position-relative-1">
                            <label
                              for="exampleInputEmail1"
                              class="form-label text-start d-block"
                            >
                              Email address
                            </label>
                            <MdMail
                              className="input-icon"
                              style={{ top: "75%" }}
                            />
                            <input
                              type="email"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Email id"
                              style={{ paddingLeft: "40px" }} // Adjust padding to accommodate the icon
                              name="email"
                              value={inputfields.email}
                              onChange={HandleChange}
                            />
                            {errormsg.email ? (
                              <span
                                style={{ color: "red", fontSize: "smaller" }}
                              >
                                {errormsg.email}
                              </span>
                            ) : null}
                          </div>
                          <div className="mb-3 position-relative-2">
                            <RiLockPasswordLine className="input-icon" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Change-password"
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "40px",
                              }} // Adjust padding for the icons
                              name="password"
                              value={inputfields.password}
                              onChange={HandleChange}
                            />
                            {errormsg.password && (
                              <span
                                style={{ color: "red", fontSize: "smaller" }}
                              >
                                {errormsg.password}
                              </span>
                            )}
                            <div
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </div>
                          </div>

                          <div className="mb-3 position-relative-2">
                            <RiLockPasswordLine className="input-icon" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              name="conformPassword"
                              placeholder="Confirm"
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "40px",
                              }}
                              value={inputfields.conformPassword}
                              onChange={HandleChange}
                            />
                            {errormsg.conformPassword ? (
                              <span
                                style={{ color: "red", fontSize: "smaller" }}
                              >
                                {errormsg.conformPassword}
                              </span>
                            ) : null}
                            <div
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </div>
                          </div>
                        </form>

                        <div className="text-center">
                          <button
                            className="log-in-btn"
                            onClick={() => {
                              handlePassWordChange(inputfields);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <a href="/register">
                            <button className="register-btn">Register</button>
                          </a>
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

export default Passwordchange;
