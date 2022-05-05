import React, { useEffect, useState } from "react";
import MenuBar from "../../../../src/components/common/menubar";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

function Admins() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    axios.get("/api/admin").then((res) => {
      const arr = res.data;
      setRequests(arr);
      console.log(requests);
    });

    return () => {};
  }, []);

  return (
    <div>
      <div className="ui menu">
        <a className="item">Home</a>
        <a className="item">Profile</a>
        <div className="right menu">
          <a className="item">Sign Out</a>
        </div>
      </div>
      {requests.map((item) => (
        <div className="ui three column grid">
          <div className="column">
            <MemoisedCard
              key={item.id}
              name={item.name}
              email={item.email}
              phone={item.phone}
              about={item.about}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admins;

const Card = ({ name, email, phone, about }) => {
  function handleClick() {
    const data = {
      name: name,
      email: email,
    };
    axios
      .post("/api/admin/approve-req", data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">{name}</div>
            <div className="meta">{email}</div>
            <div className="description">{phone}</div>
            <div className="description">{about}</div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <div className="ui basic green button" onClick={handleClick}>
                Approve
              </div>
              <div className="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MemoisedCard = React.memo(Card);
