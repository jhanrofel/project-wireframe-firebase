import React from "react";

function TTitle({ text }) {
  const style = {
    fontSize: "25px",
    marginLeft: "10px",
    marginTop: "40px",
    marginBottom: "10px",
    textAlign: "start",
  };
  return <div style={style}>{text}</div>;
}

export default TTitle;
