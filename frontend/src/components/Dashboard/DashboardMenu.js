import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { helperIdNewToken, studentIdNewToken } from "../../actions/actions";

import { DashNav, DashNav2 } from "../../hooks/index";

const DashboardMenu = props => {
  console.log("Dashboard menu props", props)
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
        {/* Students Only */}
        <Link to="/new-ticket" 
        // style={ ? { display: 'none' } : {}}
        >
          <li>Create Ticket</li>
        </Link>
        <Link to="/my-tickets" 
        // style={!localStorage.getItem('token') ? {} : { display: 'none' }}
        >
          <li>My Tickets</li>
        </Link>

        {/* Helpers Only */}
        <Link to="/tickets" 
        // style={!props.user.helper_id ? { display: 'none' } : {}}
        >
          <li>All Tickets</li>
        </Link>

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
  helperIdNewToken, studentIdNewToken
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu);
