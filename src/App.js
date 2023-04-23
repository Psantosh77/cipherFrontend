import logo from "./logo.svg";
import "./App.css";
import Profile from "./pages/profile/profile";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import Header from "./component/header";
import Home from "./pages/landingPage/landingPage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const isLogin = localStorage.getItem("isLogin");
  const [loginStatus, setLoginStatus] = useState(isLogin)
  useEffect(()=>{
    setLoginStatus(loginStatus)
  },[])

  return (
    <>
      <Router>
        <ToastContainer autoClose={2000} />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
           <Route  path="/profile" component={Profile} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
