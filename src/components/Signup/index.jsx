import React, {  useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import AuthWrapper from "../AuthWrapper";
import { signUpUserStart } from "../../redux/User/user.action";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({user}) =>({
  currentUser: user.currentUser,
  userErr: user.userErr
})

const Signup = (props) => {
  const {currentUser, userErr} = useSelector(mapState)
  const history = useHistory()
  const dispatch = useDispatch()
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if(currentUser){
      resetForm()
      history.push("/")
    }
  }, [currentUser])

  useEffect(() => {
    if(Array.isArray(userErr) && userErr.length>0){
      setErrors(userErr)
    }
  }, [userErr])

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(signUpUserStart({
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

export default Signup;
