import { MdMail } from "react-icons/md"; // Import your icon
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import company from "../Assets/images/company-1.png";
import { Link, useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { loginRequest, getisAdmincheck } from "../Api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { encryptData, decryptData } from "../service/encrypt";
import { CheckTokenIslogin } from "../service/helpers";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState({});
  const [isload, setIsload] = useState(false);
  const [inputfields, setInputfield] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.email !== undefined) {
      if (isEmpty(inputValues.email)) {
        errors.email = "Email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValues.email)
      ) {
        errors.email = "Invalid email address!";
      }
    }

    if (inputValues.password !== undefined) {
      if (isEmpty(inputValues.password)) {
        errors.password = "Password is required!";
      } else if (inputValues.password.length < 5) {
        errors.password = "Password must be at least 5 characters";
      }
    }
    return errors;
  };

  const Handlechange = async (e) => {
    try {

      const { name, value } = e.target;
      const updatedFields = { ...inputfields, [name]: value };
      setInputfield(updatedFields);

      const fieldError = validateValues({ [name]: value });
      setErrormsg((prevErrors) => ({
        ...prevErrors,
        ...fieldError,
        [name]: fieldError[name] || "",
      }));
    } catch (error) {
      console.log("Handlechange Error:", error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const errors = validateValues(data);
      setErrormsg(errors);

      if (Object.keys(errors).length === 0) {
        setIsload(true);
        const enData = encryptData(data);
        const response = await loginRequest(enData);
        if (response.status === true) {
          toast.success("Login Sucessfully!");
          localStorage.setItem("pitchuToken", response.data);
          setTimeout(() => {
            navigate("/");
          }, 2500);
          setIsload(false);
        } else if (response.message === "data is not found!") {
          setIsload(false);
          toast.warn("Please check your email");
        } else if (response.message === "Invalid password") {
          setIsload(false);
          toast.warn("Please check your password");
        } else if (response.message === "Please Enter Otp") {
          setIsload(false);
          toast.error("Otp Generate is fail!");
        } else {
          toast.error("Err Login failed");
          setIsload(false);
        }
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
                        <h2>Login</h2>
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore{" "}
                        </p>
                        <form>
                          <div class="mb-3 position-relative-1">
                            <MdMail className="input-icon" />
                            <input
                              type="email"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Email id"
                              style={{ paddingLeft: "40px" }} // Adjust padding to accommodate the icon
                              name="email"
                              value={inputfields.email}
                              onChange={Handlechange}
                            />

                          </div>
                          {errormsg.email ? (
                            <span
                              style={{ color: "red", fontSize: "smaller" }}
                            >
                              {errormsg.email}
                            </span>
                          ) : null}
                          <div className="mb-3 position-relative-2 mt-4">
                            <RiLockPasswordLine className="input-icon" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Enter your password"
                              style={{
                                paddingLeft: "40px",
                                paddingRight: "40px",
                              }} // Adjust padding for the icons
                              name="password"
                              value={inputfields.password}
                              onChange={Handlechange}
                            />
                           
                            <div
                              className="eye-icon"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </div>
                          </div>
                          {errormsg.password && (
                              <span
                                style={{ color: "red", fontSize: "smaller" }}
                              >
                                {errormsg.password}
                              </span>
                            )}
                        </form>
                        <p className="text-end Forgot-Password">
                          <Link to="/forgetpassord">Forgot Password?</Link>
                        </p>

                        <div className="text-center">
                          <button
                            className="log-in-btn"
                            onClick={() => {
                              handleLogin(inputfields);
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

export default Login;
