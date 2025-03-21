import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import Sidenav from "./Side-nav";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { encryptData, decryptData } from "../../service/encrypt";
import { getUserData } from "../../service/helpers";
import {
  findUserdata,
  internationalGetPlans,
} from "../../Api/Dashboard";
import { getisClientId } from "../../Api/AuthApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Navbartwo from "../Navbartwo";
import { DollerPrice } from "../../Api/InternationalApi";



function Dashboard3() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [clientDetails, setCliendDetails] = useState([]);
  const [internationalPlans, setinternationalPlans] = useState({});
   const [Doller, setDoller] = useState(0);
   const [High, setHigh] = useState(0);
   const [Low, setLow] = useState(0);
   const [Medium, setMedium] = useState(0);



  const getPlan = async () => {
    try {
      const res = await internationalGetPlans();
      if (res.status === true) {
        const en = decryptData(res.data);
        setinternationalPlans(en[0])
      }
    } catch (error) {
      console.log(error)
    }
  }
  const DollerPriceFetch = async () => {
    try {
        const responce = await DollerPrice();
        if (responce.status == true) {
          setDoller(responce.data);
        } else {
          setDoller(0);
        }
    } catch (error) {
      console.error("Error fetching dollar price:", error);
    }
  };

  useLayoutEffect(() => {
    getPlan()
  }, [])
  useLayoutEffect(() => {
    DollerPriceFetch()
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
        const enClientId = encryptData(clientId.clientId)
        const clienddetails = await getisClientId(enClientId);
        if (clienddetails.status == true) {
          const declienddetails = decryptData(clienddetails.data);
          setCliendDetails(declienddetails);
        }
      } else {
        setCliendDetails({})
        setUserDetails({});
      }
    } catch (error) {
      setUserDetails({});
    }
  };

  useLayoutEffect(() => {
    getClientData();
  }, []);


  const setPrice = () => {
    try {
      if (Doller !== 0) {
        const h = (Object.keys(internationalPlans).length > 0 ? internationalPlans.High : 0) / Doller;
        const l = (Object.keys(internationalPlans).length > 0 ? internationalPlans.Low : 0) / Doller;
        const m = (Object.keys(internationalPlans).length > 0 ? internationalPlans.Medium : 0) / Doller;
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

  function countEvenNumbers(n) {
    let count = 0;
    for (let i = 1; i <= n; i++) {
      if (i % 2 === 0) {
        count++;
      }
    }
    return count;
  }



  const columns = [
    {
      name: "Plan",
      selector: (row) => row.Plan,
      sortable: true,
    },
    {
      name: "Pending Referal",
      selector: (row) => row.Referal,
      sortable: true,
    },
    {
      name: "Pending Reward",
      selector: (row) => row.Reward,
      sortable: true,
    },
    {
      name: "Completed Referal",
      selector: (row) => row.Completed,
      sortable: true,
    },
    {
      name: "Total Reward",
      selector: (row) => row.TotalReward,
      sortable: true,
    },
  ];


  const data = [
    {
      id: 1,
      Plan: <div>$ {Low}</div>,
      Referal: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.internationalBuyerLength.Low == 0 ? 0 : clientDetails.internationalBuyerLength.Low % 2 === 0 ? 2 : 1
        : 2}</div>,
      Reward: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.internationalPendingAmount.Low + clientDetails.internationalRewardAmount.Low : 0} Dollar</div>,
      Completed:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.internationalBuyerLength.Low == 0 ? 0 : countEvenNumbers(clientDetails.internationalBuyerLength.Low)
            : 0}
        </div>,
      TotalReward:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.totalRewardInternational.Low : 0}
        </div>

    },
    {
      id: 1,
      Plan: <div>$ {Medium}</div>,
      Referal: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.internationalBuyerLength.Medium == 0 ? 0 : clientDetails.internationalBuyerLength.Medium % 2 === 0 ? 2 : 1 : 2}</div>,
      Reward: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.internationalPendingAmount.Medium + clientDetails.internationalRewardAmount.Medium : 0} Dollar</div>,
      Completed:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.internationalBuyerLength.Medium == 0 ? 0 : countEvenNumbers(clientDetails.internationalBuyerLength.Medium)
            : 0}
        </div>,
      TotalReward:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.totalRewardInternational.Medium : 0}
        </div>

    },
    {
      id: 1,
      Plan: <div>$ {High}</div>,
      Referal: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.internationalBuyerLength.High == 0 ? 0 : clientDetails.internationalBuyerLength.High % 2 === 0 ? 2 : 1 : 2}</div>,
      Reward: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.internationalPendingAmount.High + clientDetails.internationalRewardAmount.High : 0} Dollar</div>,
      Completed:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.internationalBuyerLength.High == 0 ? 0 : countEvenNumbers(clientDetails.internationalBuyerLength.High) 
            : 0}
        </div>,
      TotalReward:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.totalRewardInternational.High : 0}
        </div>

    },

  ];



  return (
    <div className="App">

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <Sidenav />
          </div>
          <div className="col-lg-10">
            <Navbartwo />
            <div className="Route3-active-class">
              <div className="variable-domestic-dashboard">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>International</h2>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="dashboard-table text-dark">
                          {/* <DataTable
                            columns={columns}
                            data={data}
                            theme="solarized"
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover
                            dense
                          /> */}
                          <DataTable
                            columns={columns}
                            data={data}
                            theme="solarized"
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover
                            dense
                          />
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
      {/* <Footer /> */}
    </div>
  );
}

export default Dashboard3;
