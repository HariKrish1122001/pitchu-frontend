import { makeApiRequest } from "../axiosService/axiosService";



export const InternationalPlanUserAdd = async (data) => {
    try {
  
      let params = {
        url: "https://pitchu-backend.vercel.app/client/International/InternationalPlanUserAdd",
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

  export const DollerPrice = async () => {
    try {
  
      let params = {
        url: "https://pitchu-backend.vercel.app/client/International/DollerPrice",
        method: "get",
      }
  
      const response = await makeApiRequest(params);
      return {
        status: response.status,
        data:response.data,
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

  export const UserTransferInternational = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/TransferHistory/getInternationalTransferHistory",
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


