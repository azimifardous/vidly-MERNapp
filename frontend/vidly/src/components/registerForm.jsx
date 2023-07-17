import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { register } from "../services/registerService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().max(64).required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJWT(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="mb-10 text-2xl font-bold">Register</h1>
        {this.renderInput("username", "Username", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
