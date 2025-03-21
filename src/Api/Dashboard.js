
import { makeApiRequest } from "../axiosService/axiosService";

export const findUserdata = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/findUserdata",
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


  export const findUserInfo = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/findUserInfo",
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


  export const DomesticGetPlans = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/DomesticGetPlans",
        method: "post",
        // data: { enData: data },
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

  export const internationalGetPlans = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/internationalGetPlans",
        method: "post",
        // data: { enData: data },
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

  export const sendMessage = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/sendMessage",
        method: "post",
        data: { enData: data },
      };

      console.log("paramsparamsparamsparams",params)
  
      const response = await makeApiRequest(params);
      return {
        status: response.status,
       
      };
    } catch (error) {
      console.error("getisAdmincheck", error);
      return {
        status: false,
      };
    }
  };

  export const findUserdataInternational = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/findUserdataInternational",
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

  export const sendNotification = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/sendNotification",
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

  export const sendNotificationInternational = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/NotificationInternational",
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
  export const getNotificationList = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/getNotificationList",
        method: "post",
        data: { enData: data },
      };
  
      const response = await makeApiRequest(params);
      return {
        data:response.data,
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

  export const getNotificationCheck = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/getNotificationCheck",
        method: "post",
        data: { enData: data },
      };
  
      const response = await makeApiRequest(params);
      return {
        data:response.data,
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

  
  export const rejectRequiestReferel = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/rejectRequiest",
        method: "post",
        data: { enData: data },
      };
  
      const response = await makeApiRequest(params);
      return {
        data:response.data,
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

  export const NotificationAccRequiest = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/NotificationAccRequiest",
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

  
  export const NotificationAccRequiestDomestic = async (data) => {
    try {
      let params = {
        url: "https://pitchu-backend.vercel.app/client/Dashboard/NotificationAccRequiestDomestic",
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
  