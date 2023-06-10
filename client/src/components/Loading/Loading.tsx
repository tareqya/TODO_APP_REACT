import React from "react";
import "./Loading.css";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="Loading">
      <Spinner variant="primary" />
      <span>Loading please wait...</span>
    </div>
  );
}

export default Loading;
