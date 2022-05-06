import React from "react";
import "semantic-ui-css/semantic.min.css";
import MenuBar from "../../../../src/components/common/menubar";

function Teacher() {
  const currentPath = window.location.pathname;
  const newPath = currentPath + "/add-class";
  return (
    <div>
      <div className="ui menu">
        <a className="item">Home</a>
        <a className="item">Profile</a>
        <a className="item">My classrooms</a>
        <div className="right menu">
          <a className="item" href={newPath}>
            Add a new classroom
          </a>
          <a className="item">Sign Out</a>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
