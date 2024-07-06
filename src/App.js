import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { Root } from "./components/pages/Root";
import { SignUp } from "./components/pages/SignUp";
import { SignIn } from "./components/pages/Signin";
import { Home } from "./components/pages/Home";
import { useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "./store/loginState";
import { getValidateToken } from "./apis/signin";
import { Post } from "./components/pages/Post";
import { Photo } from "./components/pages/Photo";
import { ShowTweet } from "./components/pages/ShowTweet";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);
  const background = location.state?.background;

  const handleRequireLogin = useCallback(async () => {
    const res = await getValidateToken();
    res.status ? setLogin(true) : navigate("/");
  }, [navigate, setLogin]);

  useEffect(() => {
    handleRequireLogin();
  }, [handleRequireLogin]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Root />}></Route>
        <Route path="/sign_up" element={<SignUp />}></Route>
        <Route path="/sign_in" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/post" element={<Post />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/tweets/:id" element={<ShowTweet />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/sign_up" element={<SignUp />}></Route>
          <Route path="/sign_in" element={<SignIn />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
