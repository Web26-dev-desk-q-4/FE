import React from "react";
import GenericForm from "./common/genericForm";
import Joi from "@hapi/joi";

const inputfields = {


    firstname: {
        label: "First Name",
        rules: Joi.string()
            .pattern(new RegExp("^[a-zA-Z]{3,30}$"))
            .required()
            .label("First Name")
    },

    lastname: {
        label: "Last Name",
        rules: Joi.string()
            .pattern(new RegExp("^[a-zA-Z]{3,30}$"))
            .required()
            .label("Last Name")
    },

    username: {
        label: "Username",
        rules: Joi.string()
            .alphanum()
            .min(5)
            .max(30)
            .required()
            .label("Username")
    },

    email: {
        label:"Email Address",
        rules: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .label("Email Address")

    },

    password: {
        label: "Password",
        type: "password",
        rules: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .min(7)
            .required()
            .label("Password")
    },

    RTpassword: {
        label: "Re-type Password",
        type: "password",
        rules: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .min(7)
            .required()
            .label("Password")
    }
};

const RegistrationForm = ({ onSubmit: liftUp }) => {
    const handleErrors = result => {

        console.log(result.errors);
    };
    const onSubmit = result => {

        console.log(result.data.password);

        if (result.data.password !== result.data.RTpassword) {
            result.errors.RTpassword = "Passwords must match!"
        };



        result.errors.length > 0 ? handleErrors(result) : liftUp(result);



    };
    return (
        <GenericForm
            inputfields={inputfields}
            onSubmit={onSubmit}
            formtitle="Registration Form"
            buttonlabel="Create!"
        />
    );
};

export default RegistrationForm;
