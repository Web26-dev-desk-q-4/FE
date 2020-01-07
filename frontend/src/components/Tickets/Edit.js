import React, { Component } from "react";
import { connect } from "react-redux";

import { helperEditTicket } from "../../actions/actions";

import { SForm, TicketH1 } from "../../hooks/index";
import Dashboard from "../Dashboard/Dashboard";

class Edit extends Component {
  state = {
    ticket: {
      id: "",
      title: "",
      description: "",
      category: "",
      resolved: false,
      assigned: false
    }
  };

  handleChange = e => {
    this.setState({
      ticket: { ...this.state.ticket, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.editTicket(this.state.ticket.id, this.state.ticket);
    this.props.history.push("/tickets");
  };
  render() {
    return (
      <Dashboard>
        <TicketH1>Edit Ticket Number {this.state.ticket.id}</TicketH1>
        <SForm onSubmit={this.handleSubmit} action="">
          <div className="field">
            <label htmlFor="title">Title: </label>
            <input
              name="title"
              onChange={this.handleChange}
              type="text"
              value={this.state.ticket.title}
            />
          </div>
          <div className="field">
            <label htmlFor="category">Category: </label>
            <select onChange={this.handleChange} name="category" id="">
              {this.props.categories.map(category => (
                <option key={category} value={this.state.category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="description">Description: </label>
            <textarea
              onChange={this.handleChange}
              name="description"
              value={this.state.ticket.description}
            />
          </div>
          <button type="submit">Update</button>
        </SForm>
      </Dashboard>
    );
  }
  componentDidMount() {
    const ticket = this.props.tickets.find(
      ticket => `${ticket.id}` === this.props.match.params.id
    );
    this.setState({
      ticket: { ...ticket }
    });
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    categories: state.categories
  };
};

export default connect(
  mapStateToProps,
  { helperEditTicket }
)(Edit);
