import React from "react";
import { SignInLayout } from "../templates/SignInLayouts";
import { Link, Navigate, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/loginState";
import { useAuthCreate } from "../../hooks/auth";
import { postSessionCreate } from "../../apis/signin";
import { postingActionTypes } from "../../apis/base";

export const SignIn = () => {
  const initialPostState = {
    status: "INITIAL",
    data: [],
  };

  const login = useRecoilValue(loginState);

  const location = useLocation();

  const { state, dispatch, callback } = useAuthCreate(initialPostState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch({ type: postingActionTypes.POSTING });

    postSessionCreate(formData).then((res) => {
      dispatch({
        type: res.type,
        payload: res,
        callback: {
          success: () => callback.success(res),
        },
      });
    });
  };

  return (
    <>
      {login && <Navigate to="/home" replace={true} />}

      {state.status === "OK" && <Navigate to="/home" replace={true} />}

      <SignInLayout
        formHeader={
          <div className="flex justify-between items-center p-4">
            <div className="w-1/3">
              <Link to="/">
                <RxCross2 size={25} />
              </Link>
            </div>
            <div className="w-1/3 flex justify-center">
              <FaXTwitter size={35} />
            </div>
            <div className="w-1/3"></div>
          </div>
        }
        handleSubmit={handleSubmit}
        formBody={
          <>
            <h3 className="text-3xl font-bold">Xにログイン</h3>
            <span className="text-red-500">{state?.errors}</span>
            <div>
              <input
                className="form-input-text"
                placeholder="メールアドレス"
                name="email"
                type="text"
              />
            </div>
            <div>
              <input
                className="form-input-text"
                placeholder="パスワード"
                name="password"
                type="text"
              />
              <div className="h-10"></div>
            </div>
            <div className="mt-auto">
              <button
                className="btn-primary"
                disabled={state.status === "LOADING"}
              >
                ログイン
              </button>
            </div>
          </>
        }
        callToActionContents={
          <>
            <div className="text-gray-400">
              アカウントをお持ちでない場合は
              <span className="text-blue-500 ml-1 hover:underline">
                <Link
                  to="/sign_up"
                  state={{
                    backgroundLocation:
                      location.state && location.state.backgroundLocation,
                  }}
                >
                  登録
                </Link>
              </span>
            </div>
          </>
        }
      />
    </>
  );
};
