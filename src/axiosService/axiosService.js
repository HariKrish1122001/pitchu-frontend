import axios from "axios";
import config from "../config/config";

export const makeApiRequest = async (params) => {
  try {
    

    const headers = {
      "Access-Control-Allow-Origin": "*",  // Generally not required in the request
      "Content-Type": "application/json",
    };

    let response;
    switch (params.method.toUpperCase()) {
      case "GET":
        response = await axios.get(`${config.BACKEND_URL}${params.url}`, { headers });
        break;
      case "POST":
        response = await axios.post(`${config.BACKEND_URL}${params.url}`, params.data, { headers });
             break;
      case "PUT":
        response = await axios.put(`${config.BACKEND_URL}${params.url}`, params.data, { headers });
        break;
      case "DELETE":
        response = await axios.delete(`${config.BACKEND_URL}${params.url}`, { headers });
        break;
      default:
        throw new Error(`Unsupported method: ${params.method}`);
    }

    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Axios error:", error); // Log the error
    throw error; // Rethrow the error for further handling
  }
};
