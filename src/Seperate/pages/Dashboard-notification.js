import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import Sidenav from "./Side-nav";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserData } from "../../service/helpers";
import { encryptData, decryptData } from "../../service/encrypt";
import {
  getNotificationList,
  rejectRequiestReferel,
  NotificationAccRequiest,
  NotificationAccRequiestDomestic,
} from "../../Api/Dashboard";

function Dashboardnotification() {
  const navigate = useNavigate();
  const [userNotification, setUserNotification] = useState([]);
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
        const en = encryptData(clientId.clientId);
        const responce = await getNotificationList(en);
        if (responce.status > 0) {
          const deData = decryptData(responce.data);
          setUserNotification(deData);
        } else {
          setUserNotification([]);
        }
      } else {
        setUserNotification([]);
      }
    } catch (error) {
      setUserNotification([]);
    }
  };

  useLayoutEffect(() => {
    getClientData();
  }, []);

  const rejectRequiest = async (data) => {
    try {
      const en = encryptData(data);
      const responce = await rejectRequiestReferel(en);
      if (responce.status === true) {
        toast.success(responce.message);
        getClientData();
      } else {
        toast.warn(responce.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NotificationAcc = async (data) => {
    try {
      const en = encryptData(data);
      let responce;
      if (data.category == 1) {
        responce = await NotificationAccRequiest(en);
      } else {
        responce = await NotificationAccRequiestDomestic(en);
      }
      if (responce.status == true) {
        toast.success(responce.message);
        getClientData();
      } else {
        toast.warn(responce.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "User ID",
      selector: (row) => row.User,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => row.Accept,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => row.Reject,
      sortable: true,
    },
  ];

  const data =
    userNotification &&
    userNotification.map((data, index) => {
      return {
        id: index + 1,
        Name: <div>{data.name}</div>,
        User: <div>{data.clientId}</div>,
        Amount: (
          <div>
            {data.amount}
            {data.category == 0 ? "INR" : "USD"}
          </div>
        ),
        Accept: (
          <div>
            <button
              className="Accept-btn"
              onClick={() => {
                NotificationAcc(data);
              }}
            >
              {" "}
              Accept
            </button>
          </div>
        ),
        Reject: (
          <div>
            <button
              className="Reject-btn"
              onClick={() => {
                rejectRequiest(data);
              }}
            >
              {" "}
              Reject
            </button>
          </div>
        ),
      };
    });

  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <Sidenav />
          </div>
          <div className="col-lg-10">
            <div className="Route4-active-class">
              <div className="variable-domestic-dashboard">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>Transactionhistory</h2>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="dashboard-table text-dark">
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

export default Dashboardnotification;
