import { useEffect, useCallback, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { postReducer } from "../reducers/requestActionReducer";
import { loginState } from "../store/loginState";
import { getValidateToken } from "../apis/auth";

export const useAuthCreate = (initialState) => {
  const [postState, dispatch] = useReducer(postReducer, initialState);

  const successCallback = (res) => {
    Cookies.set("access-token", res.headers.accessToken);
    Cookies.set("client", res.headers.client);
    Cookies.set("uid", res.headers.uid);
  };

  return {
    postState: postState,
    dispatch: dispatch,
    callback: {
      success: successCallback,
    },
  };
};

export const useAuthFailedCall = () => {
  const setLogin = useSetRecoilState(loginState);

  const failedCall = () => {
    setLogin(false);
  };

  return failedCall;
};

const publicPaths = ["/", "/signin", "/signup"];

export const useAuthCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);

  const handleRequireLogin = useCallback(async () => {
    if (publicPaths.includes(location.pathname)) {
      return;
    }

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (!accessToken || !client || !uid) {
      navigate("/");
      return;
    }

    const res = await getValidateToken();
    if (res.status) {
      setLogin(true);
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        navigate("/home");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate, setLogin, location.pathname]);

  useEffect(() => {
    handleRequireLogin();
  }, []);
};
