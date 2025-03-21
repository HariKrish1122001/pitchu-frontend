import React from 'react'
import logo from "../Assets/images/company-1.png"
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className='App'>
            <div className='variable-footer'>
                <div className='container'>
                    <div className='variable-inside-footer'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='variable-left-side'>
                                            <a href='/' className='text-white'>
                                                <h2> <img className='me-3' src={logo}></img>Pitchu Daily Chit</h2>

                                            </a>
                                            <p>Minim nostrud consectetur dolore ut minim cillum mollit</p>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='variable-footer-center'>
                                            <ul>
                                                <li>Home</li>
                                                <li>Domestic</li>
                                                <li>International</li>
                                                <a href='/support' className='text-white'>
                                                    <li>Support</li>
                                                </a>
                                                <li>FAQs</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='variable-footer-center'>
                                            <ul>
                                                <li>Follow us</li>
                                                <li><FaTwitter /> <FaFacebook /> <FaLinkedin /> <FaYoutube /></li>
                                                <li>Alaska, United States </li>
                                                <li>template@email.com</li>
                                                <li>(205) 387-2122</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-9'>
                            <div className='last-fotter d-flex'>
                                <p>© 2022 Brand, Inc.</p>
                                <p>. Privacy</p>
                                <p>. Terms</p>
                                <p>. Sitemap</p>

                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div className='last-fotter text-end'>
                                <select class="form-select" aria-label="Default select example">
                                    {/* <option selected>Open this select menu</option> */}
                                    <option value="1">English</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer