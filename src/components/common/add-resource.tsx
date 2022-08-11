import { useState } from "react";
import {
  Card,
  Center,
  FileInput,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import ComposedButton, {
  TypeButton,
} from "../../../src/components/common/Button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../config/firebase";
import { Input } from "semantic-ui-react";
import axios from "axios";
import { useAuth } from "../../../lib/client/context/auth";
import notify from "../../../src/components/common/Notifications";
import { useRouter } from "next/router";

export default function AddResource() {
  const [value, setValue] = useState(null);
  const [valueText, setValueText] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  function uploadFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!file) return;
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error: any) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
            console.log(url);
            setValue(url);
            resolve(url);
          });
        }
      );
    });
  }
  const onChange = (e) => {
    e.preventDefault();
    setVisible(true);
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    uploadFile(file);
    setVisible(false);
  };
  const onSubmit = async () => {
    console.log({ value });
    console.log({ valueText });
    setVisible(true);
    try {
      const response: {
        data: { status: string; message?: string; errorMessage?: string };
      } = await axios.post("/api/classrooms/resource-add", {
        data: {
          link: value,
          description: valueText,
          uploader_type: user.role,
          uploader_mail: user.email,
          c_id: router.query.id,
        },
      });
      setVisible(false);
      console.log({ response });
      const {
        data: { status },
      } = response;
      const titleForNotify = status === "success" ? "Wohoo!" : "Oops!";
      const text =
        status === "success"
          ? "Succesfully added a file!"
          : response.data.errorMessage
          ? response.data.errorMessage
          : response.data.message;
      notify({ type: status, title: titleForNotify, text });
      console.log({ response });
      return;
    } catch (err) {
      console.log(err);
      notify({
        type: "fail",
        title: "An error occured!",
        text: err.toString(),
      });
      return;
    }
  };
  return (
    <Center style={{ width: "100%", height: "100vh" }}>
      <Card withBorder style={{ width: "auto", height: "auto" }}>
        <Center>
          <LoadingOverlay visible={visible} />
          <FileInput label="File input" placeholder="Upload your task here" />
        </Center>

        <TextInput
          placeholder="Write about the file"
          mt="xl"
          style={{ width: "auto", height: "70%" }}
          onChange={(e) => setValueText(e.target.value)}
        />
        <Center mt={"xl"}>
          <ComposedButton text="submit" onClick={onSubmit} />
        </Center>
      </Card>
    </Center>
  );
}
