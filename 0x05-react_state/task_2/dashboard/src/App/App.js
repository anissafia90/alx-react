import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import CourseList from "../CourseList/CourseList";
import Notifications from "../Notifications/Notifications";
import PropTypes from "prop-types";
import { getLatestNotification } from "../utils/utils";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import { StyleSheet, css } from "aphrodite";
import { AppContext, defaultUser } from "./AppContext";

const styles = StyleSheet.create({
  App: {
    height: "100vh",
    maxWidth: "100vw",
  },
  "heading-section": {
    borderBottom: "4px solid red",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
  },
  "App-footer": {
    borderTop: "4px solid red",
    fontSize: "1.4rem",
    padding: "0.5em",
    textAlign: "center",
    fontStyle: "italic",
  },
});

const App = (props) => {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState(defaultUser);

  const logOut = () => {
    setUser(defaultUser);
  };

  const logIn = (email, password) => {
    setUser({
      email: email,
      password: password,
      isLoggedIn: true,
    });
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      props.logOut();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
  ];

  const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: getLatestNotification() },
  ];

  return (
    <AppContext.Provider value={{ user, logOut }}>
      <div className={css(styles.App)}>
        <div className={css(styles["heading-section"])}>
          <Notifications
            listNotifications={listNotifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={() => setDisplayDrawer(true)}
            handleHideDrawer={() => setDisplayDrawer(false)}
          />
          <Header />
        </div>
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList listCourses={listCourses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis at tempora odio, necessitatibus repudiandae reiciendis
            cum nemo sed asperiores ut molestiae eaque aliquam illo ipsa iste
            vero dolor voluptates.
          </p>
        </BodySection>
        <Footer className={css(styles["App-footer"])} />
      </div>
    </AppContext.Provider>
  );
};

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {
    return;
  },
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;
