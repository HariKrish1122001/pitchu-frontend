import { makeApiRequest } from "../axiosService/axiosService";


export const addMemberShip = async (data) => {
    try {
  
      let params = {
        url: "https://pitchu-backend.vercel.app/client/addMemberShip",
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

export const checkUserInfo = async (data) => {
  try {
    let params = {
      url: "https://pitchu-backend.vercel.app/client/checkUserInfo",
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

export const getUserMembership =async (data) =>{
  try {
    let params = {
      url: "https://pitchu-backend.vercel.app/client/getUserMemberShip",
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

