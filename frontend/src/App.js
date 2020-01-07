import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import RegistrationForm from "./components/registrationForm";
// import { b64encode, b64decode } from "./components/common/chillout/madmurphy";
import "./App.css";
import axios from "axios";


function App() {
  const [appState, setAppState] = useState({
    account: { username: "", password: "" }
  });
  const endPointURL = "https://whatever.what";
  const history = useHistory();
  const loginFormSubmit = ({ data: account, errors }) => {
    // we should send the account info to the backend
    const clone = { ...appState };
    clone.account = account;
    axios.put(endPointURL, account).then(result => {
      // do something
      history.replace("/nextpage");
    });
    setAppState(clone);
  };

  const registrationFormSubmit = props => {
    const {data, errors} = props;
    console.log(data)
    history.replace("/")
  }
  const loginForm = () => {
    return <LoginForm onSubmit={loginFormSubmit} />;
  };

  const registerForm = () => {
    return <RegistrationForm onSubmit={registrationFormSubmit}/>
  };

  const homePage = () => {
    return <h1>TO DO (homepage)</h1>;
  };

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact component={homePage} />
        <Route path="/register" component={registerForm} />
        <Route path="/login" component={loginForm} />
      </Switch>
    </div>
  );
}

export default App;
