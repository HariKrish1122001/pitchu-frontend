import { makeApiRequest } from "../axiosService/axiosService";



export const DomesticsPlanUserAdd = async (data) => {
    try {
  
      let params = {
        url: "/client/Domestic/DomesticsPlanUserAdd",
        method: "post",
        data: { enData: data }
      }
  
      const response = await makeApiRequest(params);
      return {
        status: response.status,
        message: response.message
      }
  
    } catch (error) {
      console.error("getisAdmincheck", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }


  
  export const UserTransferDomestic = async (data) => {
    try {
      let params = {
        url: "/client/Dashboard/TransferHistory/getDomesticTransferHistory",
        method: "post",
        data: { enData: data }
      }
  
      const response = await makeApiRequest(params);
      return {
        data: response.data,
        status: response.status,
        message: response.message
      }
  
    } catch (error) {
      console.error("getisAdmincheck", error)
      return {
        status: false,
        message: "Error On Server"
      }
    }
  }