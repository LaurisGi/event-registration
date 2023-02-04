import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login} from "./pages/Login";
import { Nopage } from "./pages/Nopage";
import { Postlogin } from "./pages/Postlogin";
import { Register } from "./pages/Register";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/AuthContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "./components/context/contexts";
import Navbar from "./components/Navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";


function App() {

  // const { setUser } = useContext(UserContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
  //   if (token) {
  //     fetch(`${process.env.REACT_APP_API_URL}/user/verify`, {
  //       headers: {
  //         authorization: 'Bearer ' + token
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (!data.error) {
  //         const { id, name } = data;
  //         setUser({ id, name });
  //         navigate('/');
  //       }
  //     });
  //   }
  // }, []);
  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Postlogin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </div>
  );
}

export default App;
