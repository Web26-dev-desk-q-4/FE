import React, { Component } from "react";
import { connect } from "react-redux";

import { SForm, TicketH1 } from "../../hooks/index";
import { createTicket } from "../../actions/actions";
import Dashboard from "../Dashboard/Dashboard";

class TicketForm extends Component {
  state = {
    ticket: {
      title: "",
      description: "",
      category: "",
      what_was_tried: ""
    }
  };

  handleChange = e => {
    this.setState({
      ticket: { ...this.state.ticket, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createTicket(this.state.ticket);
    this.props.history.push(`/tickets`);
    this.setState({
      title: "",
      description: "",
      user_id: ""
    });
  };

  render() {
    return (
      <Dashboard>
        <TicketH1>Create A Ticket</TicketH1>
        <SForm onSubmit={this.handleSubmit} action="">
          <div className="field">
            <label htmlFor="title">Title:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.ticket.title}
            />
          </div>
          <div className="field">
            <label htmlFor="category"> Category:</label>
            <select onChange={this.handleChange} name="category" id="category">
              {this.props.categories.map((category, i) => (
                <option key={i}>{category}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="description">Description:</label>
            <textarea
              onChange={this.handleChange}
              type="textarea"
              name="description"
              value={this.state.ticket.description}
            />
          </div>
          <div className="field">
            <label htmlFor="what_was_tried">What Was Tried?:</label>
            <textarea
              onChange={this.handleChange}
              type="textarea"
              name="what_was_tried"
              value={this.state.ticket.what_was_tried}
            />
          </div>
          <button type="submit">Submit</button>
        </SForm>
      </Dashboard>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    user: state.user,
    categories: state.categories
  };
};

export default connect(
  mapStateToProps,
  { createTicket }
)(TicketForm);
