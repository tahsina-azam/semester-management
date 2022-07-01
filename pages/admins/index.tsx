import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Button, LoadingOverlay, Modal, SimpleGrid } from "@mantine/core";
import AppShellWithRole from "../../src/components/common/Bars";
import { useAuth } from "../../lib/client/context/auth";
import Cards from "../../src/components/admin-card/card";
import Router from "next/router";
import notify from "../../src/components/common/Notifications";
export default function Admins() {
=======
import withAuth from "../../src/components/common/withAuth";

function Admins() {
>>>>>>> 04d9c9f (protected routes implemented)
  const [requests, setRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [textType, setTextType] = useState("");
  const [data, setData] = useState({ name: "", email: "" });
  const MemoisedCard = React.memo(Cards);
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async function () {
      const response = await axios.get("/api/admin");
      const arr = response.data;
      setRequests(arr);
      console.log(requests);
    };
    fetch();
  }, []);

  const toggleOpenAndTextType = (
    text: string,
    data: { name: string; email: string }
  ) => {
    setOpenModal((openModal) => !openModal);
    setTextType(text);
    setData(data);
  };

  const onClickYes = () => {
    setOpenModal(false);
    setLoad(true);
    textType === "delete" ? handleDelete() : handleSave();
  };
  const onClickNo = () => setOpenModal(false);

  async function handleDelete() {
    try {
      console.log(data);

      const { email } = data;
      const response = await axios.post("/api/admin/delete-req", { email });
      setLoad(false);
      console.log(response);
      const {
        data: { status },
      } = response;
      //if (status === "success") return Router.reload();
      if (response.data.errorMessage)
        return notify({
          type: "fail",
          title: "An error occured",
          text: response.data.errorMessage,
        });
        return notify({
          type: "fail",
          title: "An error occured",
          text: response.data.message,
        });
    } catch (e) {
      console.log(e);
      setLoad(false);
      return notify({
        type: "fail",
        title: "An error occured",
        text: e,
      });
    }
  }
  async function handleSave() {
    try {
      const response = await axios.post("/api/admin/approve-req", data);
      setLoad(false);
      const {
        data: { status },
      } = response;
      if (status === "success") return Router.reload();
      if (response.data.errorMessage)
        return notify({
          type: "fail",
          title: "An error occured",
          text: response.data.errorMessage,
        });
        return notify({
          type: "fail",
          title: "An error occured",
          text: response.data.message,
        });
    } catch (e) {
      console.log(e);
      setLoad(false);
      return notify({
        type: "fail",
        title: "An error occured",
        text: e,
      });
    }
    return;
  }

  return (
    <AppShellWithRole user={user}>
      <LoadingOverlay visible={load} />
      <Modal
        opened={openModal}
        title={`Are you sure to ${textType}?`}
        onClose={() => setOpenModal(false)}
      >
        {" "}
        <Button
          m="sm"
          color={textType === "delete" ? "red" : "green"}
          onClick={onClickYes}
        >
          Yes
        </Button>
        <Button
          m="sm"
          color={textType === "delete" ? "green" : "red"}
          onClick={onClickNo}
        >
          No
        </Button>
      </Modal>
      <SimpleGrid spacing={"lg"} cols={3}>
        {requests.length > 0 &&
          requests.map((req, index) => (
            <MemoisedCard
              name={req.name}
              email={req.email}
              phone={req.phone}
              about={req.about}
              key={index}
              toggleOpenAndTextType={toggleOpenAndTextType}
            />
          ))}
      </SimpleGrid>
    </AppShellWithRole>
  );
}
<<<<<<< HEAD
=======

export default withAuth(Admins);

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
  function handleDelete() {
    const data = {
      email: email,
    };
    axios
      .post("/api/admin/delete-req", data)
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
              <div className="ui basic red button" onClick={handleDelete}>
                Decline
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MemoisedCard = React.memo(Card);
>>>>>>> 04d9c9f (protected routes implemented)
