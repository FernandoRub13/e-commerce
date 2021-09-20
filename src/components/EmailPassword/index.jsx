import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart, resetUserState } from "../../redux/User/user.action";

const mapState = ({user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr:user.userErr
})

const EmailPassword = (props) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const {resetPasswordSuccess, userErr} = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      
      dispatch(resetUserState())
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if(Array.isArray(userErr) && userErr.length>0){
      setErrors(userErr)
    }
  }, [userErr]);


  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({email}))
  };

  const configAuthWrapper = {
    headline: "Email password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      {errors.length > 0 && (
        <ul>
          {errors.map((e, index) => {
            return <li key={index}>{e}</li>;
          })}
        </ul>
      )}
      <form onSubmit={handleSumbit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          handleChange={e => setEmail(e.target.value)}
        ></FormInput>
        <Button type="submit">Email password</Button>
      </form>
    </AuthWrapper>
  );
};

export default EmailPassword;
