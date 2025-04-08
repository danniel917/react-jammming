import React from "react";

const Button = (props) => {
  const { text, onClick, style } = props;
  return <button style={style} onClick={onClick}>{text}</button>;
};

export { Button };
