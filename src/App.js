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
import { Profile } from "./components/pages/Profile";
import { EditProfile } from "./components/pages/EditProfile";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { Notifications } from "./components/pages/Notifications";

function App() {
  const location = useLocation();
  const background = location.state?.background;

  useAuthCheck();
  useCurrentUser();

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Root />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/post" element={<Post />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/tweets/:id" element={<ShowTweet />} />
        <Route path="/:name" element={<Profile />} />
        <Route path="/settings/*">
          <Route path="profile" element={<EditProfile />} />
        </Route>
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
