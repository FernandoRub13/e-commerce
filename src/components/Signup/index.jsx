import React, { Component } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import AuthWrapper from "../AuthWrapper";
import { auth, handleUserProfile } from "../../firebase/utils";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      this.setState({
        errors: err,
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState,
      });
    } catch (err) {}
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;
      const configAuthWrapper ={
        headline: "Registration"
      }

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              onChange={this.handleChange}
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
            />
            <FormInput
              onChange={this.handleChange}
              type="email"
              name="email"
              value={email}
              placeholder="Email"
            />
            <FormInput
              onChange={this.handleChange}
              type="password"
              name="password"
              value={password}
              placeholder="Password"
            />
            <FormInput
              onChange={this.handleChange}
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
            />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signup;
