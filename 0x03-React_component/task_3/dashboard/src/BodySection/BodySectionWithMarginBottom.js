import React from "react";
import BodySection from "./BodySection";
import PropTypes from "prop-types";
import "./BodySectionWithMarginBottom.css";

const BodySectionWithMarginBottom = ({ title, children }) => {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default BodySectionWithMarginBottom;
