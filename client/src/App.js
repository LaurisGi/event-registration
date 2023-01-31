import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Postlogin } from "./pages/Postlogin";
import { Register } from "./pages/Register";

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/postlogin" element={<Postlogin />}/>
      </Routes>
    </div>
  );
}

export default App;
