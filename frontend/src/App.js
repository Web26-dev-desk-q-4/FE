import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Registration from "./components/Registration";
import PrivateRoute from "./components/PrivateRoute";
import TicketViews from "./views/TicketViews";
import TicketForm from "./components/Tickets/TicketForm";
// import TicketCard from "./components/Tickets/TicketCard";
import Edit from "./components/Tickets/Edit";
import MyTickets from "./components/Tickets/MyTickets";
// import axios from "axios";

function App() {
  // const [appState, setAppState] = useState({
  //   account: { username: "", password: "" }
  // });
  // const endPointURL = "https://whatever.what";
  // const loginFormSubmit = ({ data: account, errors }) => {
  //   const clone = { ...appState };
  //   clone.account = account;
  //   axios.put(endPointURL, account).then(result => {
  //   });
  //   setAppState(clone);
  // };

  // const registrationFormSubmit = props => {
  //   const { data } = props;
  //   console.log(data);
  // };
  // const loginForm = () => {
  //   return <Login onSubmit={loginFormSubmit} />;
  // };

  // const registerForm = () => {
  //   return <Registration onSubmit={registrationFormSubmit} />;
  // };

  return (
    <Router>
      {/* <NavBar /> */}
      <Switch>
        {/* <PrivateRoute
          path="/tickets/:id"
          component={props => <TicketCard {...props} />}
        /> */}
        <PrivateRoute
          path="/new-ticket"
          component={props => <TicketForm {...props} />}
        />
        <PrivateRoute path="/my-tickets" component={MyTickets} />
        <PrivateRoute path="/edit/:id" component={Edit} />
        <PrivateRoute exact path="/tickets" component={TicketViews} />

        <Route path="/" exact component={Login} />
        <Route path="/registration" component={Registration} />
      </Switch>
    </Router>
  );
}

export default App;
