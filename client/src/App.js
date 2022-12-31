import './App.css';
import { Routes, Route } from "react-router-dom"
import Authentication from './pages/Authentication'
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios'
import Main from './components/layouts/Main';
import SymptomsMenu from './pages/SymptomsMenu';
import CreatePost from './components/CreatePost';
function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getToken = async () => {
        const res = await axios.post("/api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);


  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/api/service/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token])
  return (
    <div className="bg-bgprimary flex">
      <Routes>
        <Route path="/" element={isLoggedIn?<Main />:<Authentication />}/>
        <Route path="/symptoms" element={<SymptomsMenu />}/>
        <Route path="/createyourpost" element={<CreatePost />}/>
      </Routes>
    </div>
  )
}

export default App;
