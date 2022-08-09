import { useAuth } from "../../../lib/client/context/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import notify from "../../../src/components/common/Notifications";
import { useRouter } from "next/router";
import { Button, Card, Center, LoadingOverlay, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import ComposedButton, {
  TypeButton,
} from "../../../src/components/common/Button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../config/firebase";
import { Input } from "semantic-ui-react";


export default function () {
  const [value, setValue] = useState(null);
  const [valueText, setValueText] = useState("");
  const [visible, setVisible] = useState(false);
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
            setValue(url)
            resolve(url);
          });
        }
      );
    });
  }
  const onChange = (e) => {
      e.preventDefault()
      setVisible(true);
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      uploadFile(file);
      setVisible(false);
  }
  const onSubmit = async () => {
    console.log({ value });
    console.log({ valueText });
  };
  return (
    <Center style={{ width: "100%", height: "100vh" }}>
      <Card withBorder style={{ width: "auto", height: "auto" }}>
        <Center>
          <LoadingOverlay visible={visible} />
          <Input
            type={"file"}
            required
            onChange={onChange}
          />
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
