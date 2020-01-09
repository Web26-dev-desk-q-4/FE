import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoginForm, LoginHeader } from "../hooks/index";
import { connect } from "react-redux";
import { create, logout } from "../actions/actions";

class Registration extends Component {
  state = {
    user: {
      username: "",
      password: ""
    }
  };
  
  componentDidMount() {
    this.props.logout();
    localStorage.setItem("Authorization", "");
  }

  handleChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  create = e => {
    e.preventDefault();
    this.props.create(this.state.user).then(() => {
      setTimeout(() => {
        this.props.history.push("/");
      }, 1500);
    });
    setTimeout(() => {
      this.setState({
        user: {
          ...this.state.user,
          username: "",
          password: ""
        }
      });
    }, 1500);
  };
  render() {
    return (
      <div>
        <LoginHeader>
          <h1>Registration</h1>
        </LoginHeader>
        <LoginForm onSubmit={this.create} actions="" autoComplete="off">
          <input
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.user.username}
            required
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.user.password}
            required
          />
          <button type="submit">Sign Up!</button>
          <div className="extra">
            <p>
              Have an Account? <Link to="/">Login!</Link>
            </p>
          </div>
        </LoginForm>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.status,
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  { create, logout }
)(Registration);
