import React, { Component } from "react";
import { Link } from 'react-router-dom'

import "./styles.scss";
import Button from "../forms/Button";
import { auth, signInWithGoogle } from "../../firebase/utils";

import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {}
  };
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: "Login"
    }

    return (
      <AuthWrapper {...configAuthWrapper} >
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />

            <Button onClick={this.handleSubmit}>Log in</Button>
            <hr />
            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in with google</Button>
              </div>
            </div>
            <div className="links">
              <Link to="/recovery" >
                Reset password
              </Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignIn;
