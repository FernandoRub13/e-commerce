import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAuthForms, resetPassword } from "../../redux/User/user.action";

const mapState = ({user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError:user.resetPasswordError
})

const EmailPassword = (props) => {
  const {resetPasswordError, resetPasswordSuccess} = useSelector(mapState);
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      resetForm();
      dispatch(resetAllAuthForms() );
      props.history.push("/");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if(Array.isArray(resetPasswordError) && resetPasswordError.length>0){
      setErrors(resetPasswordError)
    }
  }, [resetPasswordError]);

  const resetForm = () => {
    setEmail("");
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({email}))
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

export default withRouter(EmailPassword);
