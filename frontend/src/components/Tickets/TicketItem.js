import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTicket, getUser, helperAssignTicket } from "../../actions/actions";

class TicketItem extends Component {
  render() {
    // console.log("This is supposed to be ticket info", this.props);
    return (
      <div className="ticket-item">
        <div className="top-section">
          <div className="status">
            <p className="status-number">#{this.props.id}</p>
            <p
              className="status-resolved"
              style={
                this.props.resolved
                  ? { background: `red` }
                  : { background: `black` }
              }
            >
              {this.props.resolved ? "Closed" : "Need Fix"}
            </p>
          </div>
          <div className="ticket-info">
            <Link to={`/tickets/edit`}>
              <h1 className="ticket-title">
                {this.props.title}</h1>
            </Link>
            <p className="ticket-description">
              {this.props.description}
            </p>
          </div>
          <div className="delete-item">
            <i
              onClick={() => this.props.deleteTicket(this.props.id)}
              className="fas fa-trash"
            />
            <button type="button" onClick={() => this.props.helperAssignTicket(this.props.id, {checked_out: true})}>Claim Ticket</button>
          </div>
        </div>
        <div className="bottom-section">
          <div className="meta-tags">
            <div className="buttons">
            </div>
          </div>
        </div>
      </div>
    );
  }
  // componentDidMount() {
  //   this.props.getUser(this.props.createdBy);
  // }
}
const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users
  };
};
export default connect(
  mapStateToProps,
  { deleteTicket, getUser, helperAssignTicket }
)(TicketItem);