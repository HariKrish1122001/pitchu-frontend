import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import Sidenav from "./Side-nav";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { encryptData, decryptData } from "../../service/encrypt";
import { getUserData, } from "../../service/helpers";
import {
  DomesticGetPlans, findUserInfo,

} from "../../Api/Dashboard";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Navbartwo from "../Navbartwo";
import { getisClientId } from "../../Api/AuthApi";


function Dashboard2() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
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
      Plan: <div>₹ {Object.keys(domesticPlans).length > 0 ? domesticPlans.Low : 0}</div>,
      Referal: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.domesticBuyerLength.Low == 0 ? 0 : clientDetails.domesticBuyerLength.Low % 2 === 0 ? 2 : 1
        : 2}</div>,
      Reward: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.domesticPendingAmount.Low + clientDetails.domesticRewardAmount.Low : 0} INR</div>,
      Completed:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.domesticBuyerLength.Low == 0 ? 0 : countEvenNumbers(clientDetails.domesticBuyerLength.Low)
            : 0}
        </div>,
      TotalReward:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.totalRewardDomistic.Low : 0}
        </div>

    },
    {
      id: 1,
      Plan: <div>₹ {Object.keys(domesticPlans).length > 0 ? domesticPlans.Medium : 0}</div>,
      Referal: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.domesticBuyerLength.Medium == 0 ? 0 : clientDetails.domesticBuyerLength.Medium % 2 === 0 ? 2 : 1 : 2}</div>,
      Reward: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.domesticPendingAmount.Medium + clientDetails.domesticRewardAmount.Medium : 0} INR</div>,
      Completed:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.domesticBuyerLength.Medium == 0 ? 0 : countEvenNumbers(clientDetails.domesticBuyerLength.Medium)
            : 0}
        </div>,
      TotalReward:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.totalRewardDomistic.Medium : 0}
        </div>

    },
    {
      id: 1,
      Plan: <div>₹ {Object.keys(domesticPlans).length > 0 ? domesticPlans.High : 0}</div>,
      Referal: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.domesticBuyerLength.High == 0 ? 0 : clientDetails.domesticBuyerLength.High % 2 === 0 ? 2 : 1 : 2}</div>,
      Reward: <div>{Object.keys(clientDetails).length > 0 ? clientDetails.domesticPendingAmount.High + clientDetails.domesticRewardAmount.High : 0} INR</div>,
      Completed:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.domesticBuyerLength.High == 0 ? 0 : countEvenNumbers(clientDetails.domesticBuyerLength.High) 
            : 0}
        </div>,
      TotalReward:
        <div>
          {Object.keys(clientDetails).length > 0 ? clientDetails.totalRewardDomistic.High : 0}
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
            <div className="Route2-active-class">
              <div className="variable-domestic-dashboard">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>Domestic</h2>
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

export default Dashboard2;
