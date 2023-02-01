import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Nopage } from "./pages/Nopage";
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
          <Route path="*" element={<Nopage/>}/>
      </Routes>
    </div>
  );
}

export default App;
