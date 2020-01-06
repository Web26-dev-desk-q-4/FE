import React, { Component } from "react";
import { connect } from "react-redux";

import { ItemDiv } from "../../hooks";

import TicketItem from "./TicketItem";
import { getData } from "../../actions/actions";
import Dashboard from "../Dashboard/Dashboard";

class TicketList extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <Dashboard loggedUser={this.props.user}>
        <ItemDiv>
          {this.props.tickets.map(ticket => (
            <TicketItem
              key={ticket.id}
              id={ticket.id}
              ticket={ticket}
              title={ticket.title}
              category={ticket.category}
              createdBy={ticket.user_id}
              description={ticket.description}
            />
          ))}
        </ItemDiv>
      </Dashboard>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getData }
)(TicketList);
