import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { DashNav, DashNav2 } from "../../hooks/index";

const DashboardMenu = props => {
  return (
    <section>
    <DashNav className="dash-panel">
      <ul>
        <Link to="/new-ticket">
          <li>Create Ticket</li>
        </Link>
        <Link to="/my-tickets">
          <li>My Tickets</li>
        </Link>
        <Link to="/tickets">
          <li>All Tickets</li>
        </Link>
      </ul>
    </DashNav>

    <DashNav2 className="dash-panel-two">
      <ul>
        <Link to="/tickets">
          <li>I'm a student</li>
        </Link>
        <Link to="/tickets">
          <li>I'm a helper</li>
        </Link>
      </ul>
    </DashNav2>
  </section>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(DashboardMenu);
