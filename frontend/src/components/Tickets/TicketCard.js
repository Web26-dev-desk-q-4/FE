import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { CardDiv } from "../../hooks/index";
import { resolveTicket } from "../../actions/actions";
import Dashboard from "../Dashboard/Dashboard";

const TicketCard = props => {
  const ticket = props.tickets.find(
    ticket => `${ticket.id}` === props.match.params.id
  );

  return (
    <Dashboard>
      <CardDiv>
        <div className="top-content">
          <div className="meta-data">
            <h2>Number: #{ticket.id}</h2>
            <h2>Category: {ticket.category}</h2>
            <h2>Status: {ticket.resolved ? "Closed" : "Open"}</h2>
          </div>
          <div className="title">
            <h2>{ticket.title}</h2>
          </div>
          <div className="button-div">
            {props.user.isAdmin ? (
              <button onClick={() => props.resolveTicket(ticket.id, ticket)}>
                {ticket.resolved ? "Reopen" : "Resolve"}
              </button>
            ) : (
              <Link to={`/edit/${ticket.id}`}>
                <button>Edit</button>
              </Link>
            )}
          </div>
        </div>
        <div className="ticket-content">
          <p>{ticket.description}</p>
        </div>
      </CardDiv>
    </Dashboard>
  );
};

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { resolveTicket }
)(TicketCard);
