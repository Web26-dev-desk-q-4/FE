import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { helperIdNewToken, studentIdNewToken, getData, getHelpData } from "../../actions/actions";

import { DashNav, DashNav2 } from "../../hooks/index";

const DashboardMenu = props => {
  // const helper = e => {
  //   console.log("helper clicked")
  //   e.preventDefault();
  //   props.helperIdNewToken();
  // }

  // const student = e => {
  //   e.preventDefault();
  //   props.studentIdNewToken();
  // }

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
        <button type="button" onClick={() => props.getData()}>Student Tickets</button>
      </ul>
    </DashNav>

    <DashNav2 className="dash-panel-two">
      <ul>
        <button type="button" onClick={() => props.studentIdNewToken()}>
          <li>I'm a student</li>
        </button>
        <button type="button" onClick={() => props.helperIdNewToken()}>
          <li>I'm a helper</li>
        </button>
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

const mapDispatchToProps = {
  helperIdNewToken, studentIdNewToken, getData, getHelpData
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
