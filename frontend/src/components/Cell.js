import React from "react";
import "../styles/index.css";

export default function Cell(props) {

  return (
    <button
      className={"square " + props.shade}
      onClick={props.onClick}
      style={props.style}
    ></button>
  );
}
