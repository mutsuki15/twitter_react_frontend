import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import { Root } from "./components/pages/Root";
import { SignUp } from "./components/pages/SignUp";

function App() {
  const location = useLocation();
  const background = location.state?.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Root />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
