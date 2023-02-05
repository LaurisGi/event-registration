import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login} from "./pages/Login";
import { Nopage } from "./pages/Nopage";
import { Postlogin } from "./pages/Postlogin";
import { Register } from "./pages/Register";
import { useContext, useEffect } from "react";
import { AttendeesContext } from "./components/context/AttendeesContext";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "./components/context/contexts";
import Navbar from "./components/Navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";


function App() {
const { user } = useAuthContext();
const { setUser } = useContext(AttendeesContext);
const navigate = useNavigate();
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

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, email } = data;
          setUser({ id, email });
          // navigate('/');
        }
      });
    }
  }, []);
  return (
      <div>
        <Navbar/>
        <div className="pages">
        <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Register /> : <Navigate to="/" />} 
            />
        </Routes>
        </div>
      </div>
  );
}

export default App;
