import { makeApiRequest } from "../axiosService/axiosService";

export const rigerster = async (datas) => {
  try {
    const payload = {
      datas,
    };
    let params = {
      url: `/client/register`,
      method: "POST",
      data: payload,
    };
    const response = await makeApiRequest(params);
    return {
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.log("error===", error);
    return {
      status: false,
      message: "Error on server",
      result: [],
    };
  }
};
export const loginRequest = async (data) => {
  try {
    let params = {
      url: "/client/Login",
      method: "POST",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      data: response.token,
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("loginRequest", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};

export const getisClientcheck = async (data) => {
  try {
    let params = {
      url: "/client/getisClientcheck",
      method: "post",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      data: response.data,
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("getisAdmincheck", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};

export const getisClientId = async (data) => {
  try {
    let params = {
      url: "/client/getisClientId",
      method: "post",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      data: response.data,
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("getisAdmincheck", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};

export const forgetpasswordSendRequest = async (data) => {
  try {
    let params = {
      url: "/client/forgetpasswordSendRequest",
      method: "post",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("getisAdmincheck", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};

export const getisClient = async (data) => {
  try {
    let params = {
      url: "/client/getisClient",
      method: "post",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("getisAdmincheck", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};

export const changePassword = async (data) => {
  try {
    let params = {
      url: "/client/changePassword",
      method: "post",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("getisAdmincheck", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};

export const userInfo = async (data) => {
  try {
    let params = {
      url: "/client/userInfo",
      method: "post",
      data: { enData: data },
    };

    const response = await makeApiRequest(params);
    return {
      data: response.data,
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.error("getisAdmincheck", error);
    return {
      status: false,
      message: "Error On Server",
    };
  }
};
