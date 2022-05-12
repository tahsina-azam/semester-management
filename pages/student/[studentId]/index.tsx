import React from "react";
import "semantic-ui-css/semantic.min.css";
import { useRouter } from "next/router";

function Student() {
  //const currentPath = window.location.pathname;
  const router = useRouter();
  const currentPath = router.pathname;
  const newPath = currentPath + "/join-class";
  return (
    <div>
      <div className="ui menu">
        <a className="item">Home</a>
        <a className="item">Profile</a>
        <a className="item">Semester Rooms</a>
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
