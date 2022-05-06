import React from "react";

function Student() {
  const currentPath = window.location.pathname;
  const newPath = currentPath + "/join-class";
  return (
    <div>
      <div className="ui menu">
        <a className="item">Home</a>
        <a className="item">Profile</a>
        <a className="item">My classrooms</a>
        <div className="right menu">
          <a className="item" href={newPath}>
            join classroom
          </a>
          <a className="item">Sign Out</a>
        </div>
      </div>
    </div>
  );
}

export default Student;
