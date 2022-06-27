import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import storage from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import dynamic from "next/dynamic";
import { Center } from "@mantine/core";
import { ComposedButton } from "./common";

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
  const handleClick = () => {
    console.log({ value, onChange });
  };
  return (
    <Center style={{ flexDirection: "column" }}>
      <RichText
        value={value}
        onChange={onChange}
        onImageUpload={uploadImage}
        style={{ width: "70%" }}
      />
      <div>
        <ComposedButton
          text={"Post"}
          onClick={handleClick}
          style={{ mt: "md" }}
        />
      </div>
    </Center>
  );
}
