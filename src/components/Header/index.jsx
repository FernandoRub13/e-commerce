import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import {auth} from '../../firebase/utils';
import { signOutUserStart, signOutUserSuccess } from "../../redux/User/user.action";

const mapSate = ({user}) =>({
  currentUser:  user.currentUser
})

const Header = (props) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapSate);

  const signOut = ()=>{
    dispatch(signOutUserStart());
  }

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My account</Link>
              </li>
              <li>
                <span onClick={()=>signOut()}>Logout</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
