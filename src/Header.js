import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { UseStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = UseStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="headerlogo"
          src="https://www.airkewld.com/v/vspfiles/assets/images/amazon_PNG13.png"
        />
      </Link>

      <div className="header_search">
        <input className="header_serch_input" type="text" />
        <SearchIcon className="header_serachIcon"></SearchIcon>
        {/* logo */}
      </div>
      <div className="header_navi">
        <Link to="/login">
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionlineone">{!user?'Guest':user.email}</span>
            <span className="header_optionlinetwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionlineone">Check</span>
          <span className="header_optionlinetwo">Examples</span>
        </div>
        <div className="header_option">
          <span className="header_optionlineone">Your</span>
          <span className="header_optionlinetwo">Personality</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionbasket">
            <ShoppingBasketIcon></ShoppingBasketIcon>
            <span className="header_optionlinetwo header_basketCount">
              {basket?.length}{" "}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
