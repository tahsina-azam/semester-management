import { useEffect, useMemo, useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import storage from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import dynamic from "next/dynamic";
import { Center, Group } from "@mantine/core";
import { ComposedButton } from "./common";
import axios from "axios";

const RichText = dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

function uploadImage(image: File): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!image) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
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
          resolve({ data: { link: url } });
        });
      }
    );
  });
}
const initialValue =
  "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

export default function Rte() {
  const [value, onChange] = useState(initialValue);
  const [people, setPeople] = useState<{ id: number; value: string }[]>([]);
  const tags = [
    { id: 1, value: "JavaScript" },
    { id: 2, value: "TypeScript" },
    { id: 3, value: "Ruby" },
    { id: 3, value: "Python" },
  ];
  useEffect(() => {
    async function fetchClassInfo() {
      try {
        const response: any = await axios.post("/api/all-students", {});
        setPeople(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchClassInfo();
  }, []);
  const handleClick = () => {
    console.log({ value, onChange });
    console.log({ people });
  };
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = mentionChar === "@" ? people : tags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
      },
    }),
    []
  );
  return (
    <Center style={{ flexDirection: "column", alignItems: "flex-start" }}>
      <RichText
        value={value}
        onChange={onChange}
        onImageUpload={uploadImage}
        mentions={mentions}
      />
      <ComposedButton
        text={"Post"}
        onClick={handleClick}
        style={{ mt: "md" }}
      />
    </Center>
  );
}
