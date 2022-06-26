import React from "react";
import "semantic-ui-css/semantic.min.css";
import Link from "next/link";

function SemesterRoom() {
  return (
    <div style={{ padding: "2rem" }}>
      <div className="ui three stackable cards">
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <img src="/images/rooms/books.jpg" />
            <div className="content">
              <div className="header">first year first semester</div>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <img src="/images/rooms/books.jpg" />
            <div className="content">
              <div className="header">first year second semester</div>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <img src="/images/rooms/books.jpg" />
            <div className="content">
              <div className="header">second year first semester</div>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <img src="/images/rooms/books.jpg" />
            <div className="content">
              <div className="header">second year second semester</div>
            </div>
          </div>
        </div>
        <Link href="/semester-rooms/three-one">
          <div className="card" style={{ width: 200, height: 130 }}>
            <div className="image">
              <img src="/images/rooms/books.jpg" />
              <div className="content">
                <div className="header">third year first semester</div>
              </div>
            </div>
          </div>
        </Link>
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <img src="/images/rooms/books.jpg" />
            <div className="content">
              <a href="/semester-rooms/three-one">
                <div className="header">third year second semester</div>
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <Link href="/semester-rooms/three-one">
              <img src="/images/rooms/books.jpg" />
            </Link>
            <div className="content">
              <div className="header">fourth year first semester</div>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: 200, height: 130 }}>
          <div className="image">
            <img src="/images/rooms/books.jpg" />
            <div className="content">
              <div className="header">fourth year second semester</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemesterRoom;
