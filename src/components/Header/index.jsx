import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { auth } from "../../firebase/utils";
import {
  signOutUserStart,
  signOutUserSuccess,
} from "../../redux/User/user.action";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";

const mapSate = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state) 
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser,totalNumCartItems } = useSelector(mapSate);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>
            <li>
              <Link>
                Your Cart ({totalNumCartItems})
              </Link>
            </li>
            {currentUser && [
              <li>
                <Link to="/dashboard">My account</Link>
              </li>,
              <li>
                <span onClick={() => signOut()}>Logout</span>
              </li>,
            ]}
        
            {!currentUser && [
              <li>
                <Link to="/registration">Register</Link>
              </li>,
              <li>
                <Link to="/login">Login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
