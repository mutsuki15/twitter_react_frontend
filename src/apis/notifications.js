import { notifications } from "../urls";
import { baseAxiosWithAuthHeaders, fetchingActionTypes } from "./base";

export const fetchNotificationsIndex = () => {
  return baseAxiosWithAuthHeaders
    .get(notifications)
    .then((res) => ({
      type: fetchingActionTypes.FETCH_SUCCESS,
      data: res.data,
    }))
    .catch((error) => {
      const authFailed = error.response?.status === 401;
      return {
        type: authFailed
          ? fetchingActionTypes.AUTH_FAILED
          : fetchingActionTypes.FETCH_FAILED,
        errors: error,
      };
    });
};
