import React from "react";
import "../styles/button.css";

const Button = ({
  id,
  handleClick,
  volume,
  char,
  type,
  clicked,
  power,
  hideKeys,
}) => {
  // Functional Button component

  // Classes for different button styles
  let buttonClass;
  // Power On/Off
  if (!power) {
    buttonClass = clicked ? "off-active" : "off";
  } else {
    // Button is clicked / not clicked
    buttonClass = clicked
      ? `drum-button-active ${type}-active`
      : `drum-button ${type}`;
  }

  return (
    <button className={buttonClass} onClick={() => handleClick(id, volume)}>
      {hideKeys ? null : char}
    </button>
  );
};

export default Button;
