import { getisClientcheck } from "../Api/AuthApi";
import { encryptData, decryptData } from "../service/encrypt";

export const CheckTokenIslogin = async () => {
  try {
    const token = localStorage.getItem("pitchuToken");
    if (!token) {
      return false;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    let decoded_id = decodedToken.clientId;
    const encrypt = encryptData(decoded_id);
    const reponse = await getisClientcheck(encrypt);

    if (reponse.status === false) {
      return false;
    }
    const value = decryptData(reponse.data);

    const idVal = value[0].clientId;
    if (!idVal) {
      return false;
    }
    if (idVal === decoded_id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.name === "InvalidTokenError") {
      console.log("InvalidTokenError");
      return false;
    }
  }
};

export const getUserData = async () => {
  try {
    const token = localStorage.getItem("pitchuToken");
    if (!token) {
      return null;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    let decoded_id = decodedToken.clientId;
    const encrypt = encryptData(decoded_id);
    const reponse = await getisClientcheck(encrypt);

    if (reponse.status === false) {
      return null;
    }
    const value = decryptData(reponse.data);
    const idVal = value[0].clientId;
    if (!idVal) {
      return null;
    }
    if (idVal === decoded_id) {
      return value[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log("CheckTokenIslogin error", error);
    if (error.name === "InvalidTokenError") {
      console.log("InvalidTokenError");
      return null;
    }
  }
};
