import React, {  useEffect, useState } from "react";
import { withRouter } from "react-router";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import AuthWrapper from "../AuthWrapper";
import { signUpUser } from "../../redux/User/user.action";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({user}) =>({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const Signup = (props) => {
  const {signUpSuccess, signUpError} = useSelector(mapState)
  const dispatch = useDispatch()
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if(signUpSuccess){
      resetForm()
      props.history.push("/")
    }
  }, [signUpSuccess])

  useEffect(() => {
    if(Array.isArray(signUpError) && signUpError.length>0){
      setErrors(signUpError)
    }
  }, [signUpError])

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(signUpUser({
      displayName,
      email,
      password,
      confirmPassword
    }))
  };

  const configAuthWrapper = {
    headline: "Registration",
  };

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
        <form onSubmit={handleFormSubmit}>
          <FormInput
            handleChange={(e) => setDisplayName(e.target.value)}
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
          />
          <FormInput
            handleChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            value={email}
            placeholder="Email"
          />
          <FormInput
            handleChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
          />
          <FormInput
            handleChange={(e) => setConfirmPassword(e.target.value)}
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
};

export default withRouter(Signup);
