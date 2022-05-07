import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";

function MenuBar() {
  return (
    <>
      <div className="ui menu">
        <a className="item">Browse</a>
        <a className="item">Submit</a>
        <div className="right menu">
          <a className="item">Sign Up</a>
          <a className="item">Help</a>
        </div>
      </div>
    </>
  );
}

export default MenuBar;