import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Root } from "./components/pages/Root";
import { SignUp } from "./components/pages/SignUp";
import { SignIn } from "./components/pages/Signin";
import { Home } from "./components/pages/Home";
import { Post } from "./components/pages/Post";
import { Photo } from "./components/pages/Photo";
import { ShowTweet } from "./components/pages/ShowTweet";
import { useAuthCheck } from "./hooks/auth";

function App() {
  const location = useLocation();
  const background = location.state?.background;

  useAuthCheck();

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Root />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/post" element={<Post />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/tweets/:id" element={<ShowTweet />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
