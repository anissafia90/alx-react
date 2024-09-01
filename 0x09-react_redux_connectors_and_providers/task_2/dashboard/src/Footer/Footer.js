import React from "react";
import "./Footer.css";
import { getFullYear, getFooterCopy } from "../utils/utils";
import { AppContext } from "../App/AppContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Footer = () => {
  return (
    <AppContext.Consumer>
      {({ user: { email, password, isLoggedIn }, logOut }) => (
        <div className="footer">
          {isLoggedIn && (
            <p>
              <a>Contact us</a>
            </p>
          )}
          <p>
            Copyright {getFullYear()} - {getFooterCopy(true)}
          </p>
        </div>
      )}
    </AppContext.Consumer>
  );
};

Footer.defaultProps = {
  user: null,
};

Footer.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
  };
};

export default connect(mapStateToProps, null)(Footer);
