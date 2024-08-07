import React from "react";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

const opacityAnim = {
  "0%": { opacity: 0.5 },
  "100%": { opacity: 1 },
};

const bounceAnim = {
  "0%": { transform: "translateY(0px)" },
  "33%": { transform: "translateY(-5px)" },
  "66%": { transform: "translateY(5px)" },
  "100%": { transform: "translateY(0px)" },
};

const styles = StyleSheet.create({
  Notifications: {
    padding: "2em",
    border: "2px dashed red",
    "@media (max-width: 375px)": {
      display: "block",
      width: "105vw",
      border: "none",
      fontSize: "20px",
      padding: "0",
    },
  },
  menuItem: {
    textAlign: "right",
    width: "90%",
    ":hover": {
      cursor: "pointer",
      animationName: [opacityAnim, bounceAnim],
      animationDuration: "1s, 0.5s",
      animationIterationCount: "3",
    },
    "@media (max-width: 375px)": {
      textAlign: "left",
    },
  },
  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  ul: {
    "@media (max-width: 900px)": {
      padding: 0,
    },
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.displayDrawer ? (
          <div className={css(styles.flexArea)}>
            <div className={css(styles.menuItem)}>
              <p>Your notifications</p>
            </div>
            <div className={css(styles.Notifications)}>
              <ul>
                {this.props.listNotifications &&
                this.props.listNotifications.length > 0 ? (
                  this.props.listNotifications.map(
                    ({ id, html, type, value }) => (
                      <NotificationItem
                        key={id}
                        markAsRead={this.markAsRead}
                        type={type}
                        value={value}
                        html={html}
                      />
                    )
                  )
                ) : (
                  <div className={css(styles.notificationHeader)}>
                    <NotificationItem value="No new notification for now" />
                    <button
                      style={{ border: "none", background: "none" }}
                      aria-label="Close"
                      onClick={() =>
                        console.log("Close button has been clicked")
                      }
                    >
                      <img
                        style={{ display: "inline" }}
                        src={closeIcon}
                        alt="Close"
                      />
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className={css(styles.menuItem)}>
            <p>Your notifications</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
