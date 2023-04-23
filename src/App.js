import logo from "./logo.svg";
import "./App.css";
import Profile from "./pages/profile/profile";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import Header from "./component/header";
import Home from "./pages/landingPage/landingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const isLogin = localStorage.getItem("isLogin");

  return (
    <>
      <Router>
        <ToastContainer autoClose={2000} />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          {isLogin == "true" && <Route path="/profile" component={Profile} />}
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
