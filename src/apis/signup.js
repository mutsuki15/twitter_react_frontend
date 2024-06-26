import { users } from "../urls/index";
import { baseAxios } from "./base";

export const usersActionTypes = {
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
  POST_FAILED: "POST_FAILED",
};

export const postRegistrationCreate = (formData) => {
  const year = formData.get("birthyear");
  const month = formData.get("birthmonth");
  const day = formData.get("birthday");

  const postData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
    phone: formData.get("phone"),
    birthday: `${year}-${month}-${day}`,
    confirm_success_url: "http://localhost:3000/letter_opener/",
  };

  return baseAxios
    .post(users, postData)
    .then(() => ({
      type: usersActionTypes.POST_SUCCESS,
      messages: "登録完了しました。メールを確認してください。",
    }))
    .catch((e) => ({
      type: usersActionTypes.POST_FAILED,
      errors: e.response.data.errors,
    }));
};
