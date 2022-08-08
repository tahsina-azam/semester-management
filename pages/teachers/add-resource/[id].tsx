import { useAuth } from "../../../lib/client/context/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import notify from "../../../src/components/common/Notifications";
import { useRouter } from "next/router";
import { Button, Card, Center, TextInput } from "@mantine/core";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Input } from "semantic-ui-react";
import { useForm } from "@mantine/form";
import { TypeButton } from "../../../src/components/common/Button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../config/firebase";

function uploadFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
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
          resolve(url);
        });
      }
    );
  });
}
export default function () {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const onSubmit = async (values) => {
    const { description, file } = values;
    const link = uploadFile(file);
    console.log(link);
  };
  const form = useForm({
    initialValues: {
      file: null,
      description: "",
    },
  });
  return (
    <Center style={{ width: "100%", height: "100vh" }}>
      <Card withBorder style={{ width: "auto", height: "auto" }}>
        <Center>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Center>
              <Input type={"file"} required {...form.getInputProps("file")} />
            </Center>

            <TextInput
              placeholder="Write about the file"
              mt="xl"
              style={{ width: "auto", height: "70%" }}
              {...form.getInputProps("description")}
            />
            <Center mt={"xl"}>
              <TypeButton />
            </Center>
          </form>
        </Center>
      </Card>
    </Center>
  );
}
