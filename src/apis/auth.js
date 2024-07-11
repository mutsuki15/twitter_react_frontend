import Cookies from "js-cookie";
import { signIn, users, validateToken } from "../urls";
import {
  baseAxios,
  baseAxiosWithAuthHeaders,
  postingActionTypes,
} from "./base";

export const postSessionCreate = (formData) => {
  const postData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  return baseAxios
    .post(users + signIn, postData)
    .then((res) => {
      const { "access-token": accessToken, client, uid } = res.headers;

      Cookies.set("access-token", accessToken);
      Cookies.set("client", client);
      Cookies.set("uid", uid);

      return {
        type: postingActionTypes.POST_SUCCESS,
        headers: {
          accessToken,
          client,
          uid,
        },
      };
    })
    .catch((e) => ({
      type: postingActionTypes.POST_FAILED,
      errors: e.response.data.errors,
    }));
};

export const getValidateToken = () => {
  const accessToken = Cookies.get("access-token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  return baseAxiosWithAuthHeaders
    .get(users + validateToken)
    .then(() => ({
      status: true,
    }))
    .catch(() => ({
      status: false,
    }));
};
