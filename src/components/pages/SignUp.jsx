import React from "react";
import { SignUpLayout } from "../templates/SignUpLayouts";
import { Link, Navigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { InputTextArea } from "../atoms/InputTextArea";
import { InputBirthday } from "../atoms/InputBirthday";
import { postRegistrationCreate } from "../../apis/users";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/loginState";
import { postingActionTypes } from "../../apis/base";
import { useUserCreate } from "../../hooks/signup";

export const SignUp = () => {
  const initialState = {
    status: "INITIAL",
    data: [],
  };

  const login = useRecoilValue(loginState);

  const { postState, dispatch } = useUserCreate(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch({ type: postingActionTypes.POSTING });

    postRegistrationCreate(formData).then((res) => {
      dispatch({
        type: res.type,
        payload: res,
      });
    });
  };

  return (
    <>
      {postState.status === "OK" && (
        <Navigate to="/" replace={true} state={postState.data} />
      )}

      {login && <Navigate to="/home" replace={true} />}

      <SignUpLayout
        fromHeader={
          <div className="flex justify-between items-center p-4">
            <div className="w-1/3">
              <Link to={`/`}>
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
            <h3 className="text-3xl font-bold mb-6">アカウントを作成</h3>
            <div>
              <InputTextArea
                placeholder={`ユーザー名`}
                name="name"
                type="text"
              />
              <div className="h-10">
                {postState.errors?.name && (
                  <small className="text-red-500">
                    ※ユーザー名{postState.errors.name}
                  </small>
                )}
              </div>
            </div>
            <div>
              <InputTextArea placeholder="メール" name="email" type="text" />
              <div className="h-10">
                {postState.errors?.email && (
                  <small className="text-red-500">
                    ※メールアドレス{postState.errors.email}
                  </small>
                )}
              </div>
            </div>
            <div>
              <InputTextArea placeholder="電話番号" name="phone" type="text" />
              <div className="h-10">
                {postState.errors?.phone && (
                  <small className="text-red-500">
                    ※電話番号{postState.errors.phone}
                  </small>
                )}
              </div>
            </div>
            <div>
              <p className="font-bold mb-3">生年月日</p>
            </div>
            <div>
              <InputBirthday />
              <div className="h-10">
                {postState.errors?.birthday && (
                  <small className="text-red-500">
                    ※生年月日{postState.errors.birthday}
                  </small>
                )}
              </div>
            </div>
            <div>
              <InputTextArea
                placeholder="パスワード"
                name="password"
                type="password"
              />
              <div className="h-10">
                {postState.errors?.password && (
                  <small className="text-red-500">
                    ※パスワード{postState.errors.password}
                  </small>
                )}
              </div>
            </div>
            <div>
              <InputTextArea
                placeholder="確認パスワード"
                name="password_confirmation"
                type="password"
              />
              <div className="h-10">
                {postState.errors?.password_confirmation && (
                  <small className="text-red-500">
                    ※確認パスワード{postState.errors.password_confirmation}
                  </small>
                )}
              </div>
            </div>
            <div className="mt-auto">
              <button className="btn-primary" type="submit">
                登録
              </button>
            </div>
          </>
        }
      />
    </>
  );
};
