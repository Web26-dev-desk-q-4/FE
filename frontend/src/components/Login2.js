import React from "react";
import GenericForm from "./common/genericForm";
import Joi from "@hapi/joi";
import { connect } from "react-redux";
import { login } from "../actions/actions";

const inputfields = {
  username: {
    label: "Username",
    rules: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required()
      .label("Username")
  },
  password: {
    label: "Password",
    type: "password",
    rules: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(7)
      .required()
      .label("Password")
  }
};

const LoginForm = props => {
  const { onSubmit: liftUp } = props;
  const handleErrors = result => {
    console.log(result.errors);
  };
  const onSubmit = result => {
    result.errors.length > 0 ? handleErrors(result) : liftUp(result);
    console.log(result)
  };

  const doLogin = accountInfo => {
    // const uname = accountInfo.username;
    // const upass = acocuntInfo.password;
    props.login(accountInfo).then(() => {
      setTimeout(() => {
        liftUp(accountInfo);
        props.history.push("/my-tickets");
      }, 1485);
    });
    // setTimeout(() => {
    //   this.setState({
    //     credentials: {
    //       ...this.state.credentials,
    //       username: "",
    //       password: ""
    //     }
    //   });
    // }, 1485);
  };

  return (
    <GenericForm
      inputfields={inputfields}
      onSubmit={onSubmit}
      formtitle="Login"
      buttonlabel="Sign In"
    />
  );
};

export default LoginForm;
