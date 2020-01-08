import React from "react";
import styled from "styled-components";

// const StyledInput = styled.input`
// background-color: #C5C6C7;
// `
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor="password">{label}</label>
      <input style={{backgroundColor: "#C5C6C7"}} id={name} name={name} className="form-control" {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
