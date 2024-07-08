import Cookies from "js-cookie";
import { users } from "../urls";
import { baseAxiosWithAuthHeaders } from "./base";

export const signOut = async () => {
  try {
    const response = await baseAxiosWithAuthHeaders.delete(users + "/sign_out");

    Cookies.remove("access-token");
    Cookies.remove("client");
    Cookies.remove("uid");

    return {
      status: response.status,
    };
  } catch (error) {
    return {
      status: error.response.status,
      errors: error.response.data.errors,
    };
  }
};
