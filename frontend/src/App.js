import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login2 from "./components/Login2";

import PrivateRoute from "./components/PrivateRoute";
import TicketViews from "./views/TicketViews";
import Registration2 from "./components/Registration2";
import TicketForm from "./components/Tickets/TicketForm";
import TicketCard from "./components/Tickets/TicketCard";
import Edit from "./components/Tickets/Edit";
import MyTickets from "./components/Tickets/MyTickets";

import TestFormSelect from "./components/testFormSelect"; // example form

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

  const testAnyComponent = () => {
    return (
      <TestFormSelect
        onSubmit={e => console.log(e)}
        priorities={[
          "when you have some time...",
          "please make some time for ...",
          "don't, you ...forget about",
          "OK Seriously... ",
          "TOP PRIORITY!"
        ]}
      />
    );
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

        <Route path="/test" component={testAnyComponent} />
      </Switch>
    </Router>
  );
}

export default App;
