import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login2 from "./components/Login2";
// import { b64encode, b64decode } from "./components/common/chillout/madmurphy";
import PrivateRoute from "./components/PrivateRoute";
import TicketViews from "./views/TicketViews";
import Registration2 from "./components/Registration2";
import TicketForm from "./components/Tickets/TicketForm";
import TicketCard from "./components/Tickets/TicketCard";
import Edit from "./components/Tickets/Edit";
import MyTickets from "./components/Tickets/MyTickets";

// import React, { useState } from "react";
// import { Route, Switch, useHistory } from "react-router-dom";
// import LoginForm from "./components/loginForm";
// import NavBar from "./components/navBar";
// // import { b64encode, b64decode } from "./components/common/chillout/madmurphy";
// import "./App.css";
import axios from "axios";

function App() {
  const [appState, setAppState] = useState({
    account: { username: "", password: "" }
  });
  const endPointURL = "https://whatever.what";
  // const uhist = useHistory();
  const loginFormSubmit = ({ data: account, errors }) => {
    // we should send the account info to the backend
    const clone = { ...appState };
    clone.account = account;
    axios.put(endPointURL, account).then(result => {
      // do something
      //history.replace("/nextpage");
    });
    setAppState(clone);
  };

  const registrationFormSubmit = props => {
    const { data } = props;
    console.log(data);
    //history.replace("/");
  };
  const loginForm = () => {
    return <Login2 onSubmit={loginFormSubmit} />;
  };

  const registerForm = () => {
    return <Registration2 onSubmit={registrationFormSubmit} />;
  };

  return (
    <Router>
      <NavBar />
      <Switch>
        <PrivateRoute
          path="/tickets/:id"
          component={props => <TicketCard {...props} />}
        />
        <PrivateRoute
          path="/new-ticket"
          component={props => <TicketForm {...props} />}
        />
        <PrivateRoute path="/my-tickets" component={MyTickets} />
        <PrivateRoute path="/edit/:id" component={Edit} />
        <PrivateRoute exact path="/tickets" component={TicketViews} />
        <Route path="/registration" component={Registration2} />

        <Route path="/" exact component={loginForm} />
        <Route path="/register" component={registerForm} />
        <Route path="/login" component={loginForm} />
      </Switch>
    </Router>
  );
}

export default App;
