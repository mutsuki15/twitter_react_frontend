import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Root } from "./components/pages/Root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
