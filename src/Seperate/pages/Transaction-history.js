import React, { useEffect, useRef, useState } from "react";
import Sidenav from "./Side-nav";
import DataTable from "react-data-table-component";
import { encryptData, decryptData } from "../../service/encrypt";
import { getUserData } from "../../service/helpers";
import { Link, useNavigate } from "react-router-dom";
import { FaCommentsDollar } from "react-icons/fa";
import { UserTransferDomestic } from "../../Api/DomesitApi";
import { UserTransferInternational } from "../../Api/InternationalApi";
import { format } from "date-fns";

function Transactionhistory() {
  const navigate = useNavigate();
  const [domesticData, setDomesticData] = useState([]);
  const [InternationalData, setInternationalData] = useState([]);

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
      const domestic = await UserTransferDomestic(enData);
      const International = await UserTransferInternational(enData);
      if (domestic.status === true) {
        const deData = decryptData(domestic.data);
        setDomesticData(deData);
      } else {
        setDomesticData([]);
      }
      if (International.status === true) {
        const deData = decryptData(International.data);
        setInternationalData(deData);
      } else {
        setInternationalData([]);
      }

     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientData();
  }, []);

  const columns = [
    {
      name: "Date & Time",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "Winning Amount",
      selector: (row) => row.Winning,
      sortable: true,
    },
    {
      name: "Liability amount",
      selector: (row) => row.Liability,
      sortable: true,
    },
  ];

  const data =
    domesticData &&
    domesticData.map((data, index) => {
      const formattedTime = format(data.date, "h:mm a");
      const formattedDateTime = format(data.date, "yyyy-MM-dd h:mm a");

      return {
        id: index + 1,
        Date: (
          <div>
            {formattedDateTime} ({formattedTime})
          </div>
        ),
        Winning: <div>{data.rewardAmount}INR</div>,
        Liability: <div>{data.amount}INR</div>,
      };
    });

  const data1 =
    InternationalData &&
    InternationalData.map((data, index) => {
      const formattedTime = format(data.date, "h:mm a");
      const formattedDateTime = format(data.date, "yyyy-MM-dd h:mm a");

      return {
        id: index + 1,
        Date: (
          <div>
            {formattedDateTime} ({formattedTime})
          </div>
        ),
        Winning: <div>{data.rewardAmount}USD</div>,
        Liability: <div>{data.amount}USD</div>,
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
            <div className="Route5-active-class">
              <div className="variable-domestic-dashboard">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>Transactionhistory</h2>
                    <div className="row">
                      <div className="col-lg-12">
                        <ul
                          class="nav nav-pills mb-3 justify-content-center align-items-center"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link active"
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              Domestic
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="pills-profile"
                              aria-selected="false"
                            >
                              International
                            </button>
                          </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                          <div
                            class="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                            tabindex="0"
                          >
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
                          <div
                            class="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                            tabindex="0"
                          >
                            <div className="dashboard-table text-dark">
                              <DataTable
                                columns={columns}
                                data={data1}
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
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Transactionhistory;
