import React from "react";
import { SignInLayout } from "../templates/SignInLayouts";
import { Link, Navigate, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../store/loginState";
import { currentUserState } from "../../store/currentUserState";
import { useAuthCreate } from "../../hooks/auth";
import { postSessionCreate } from "../../apis/auth";
import { postingActionTypes } from "../../apis/base";
import { fetchCurrentUser } from "../../apis/base";

export const SignIn = () => {
  const initialPostState = {
    status: "INITIAL",
    data: [],
  };

  const login = useRecoilValue(loginState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const location = useLocation();

  const { postState, dispatch, callback } = useAuthCreate(initialPostState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch({ type: postingActionTypes.POSTING });

    const res = await postSessionCreate(formData);
    if (res.type === postingActionTypes.POST_SUCCESS) {
      dispatch({
        type: res.type,
        payload: res,
        callback: {
          success: async () => {
            callback.success(res);
            const userResponse = await fetchCurrentUser();
            if (userResponse.status === 200) {
              setCurrentUser(userResponse.data.current_user);
            }
          },
        },
      });
    } else {
      dispatch({
        type: res.type,
        payload: res,
      });
    }
  };

  if (login) {
    return <Navigate to="/home" replace={true} />;
  }

  if (postState.status === "OK") {
    return <Navigate to="/home" replace={true} />;
  }

  return (
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
          <span className="text-red-500">{postState?.errors}</span>
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
              disabled={postState.status === "LOADING"}
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
                to="/signup"
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
  );
};
