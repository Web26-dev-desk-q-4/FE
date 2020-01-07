import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login2 from "./components/Login2";
import PrivateRoute from "./components/PrivateRoute";
import TicketViews from "./views/TicketViews";
import Registration2 from "./components/Registration2";
import TicketForm from "./components/Tickets/TicketForm";
import TicketCard from "./components/Tickets/TicketCard";
import Edit from "./components/Tickets/Edit";
import MyTickets from "./components/Tickets/MyTickets";

function App() {
  return (
    <Router>
      <NavBar />
        <Route exact path="/" component={Login2} />
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
    </Router>
  );
}

export default App;
