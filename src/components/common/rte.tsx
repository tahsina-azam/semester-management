import { Center } from "@mantine/core";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import useSWR from "swr";
import storage from "../../../config/firebase";


const RichText = dynamic(() => import("@mantine/rte"), {
  ssr: false,
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
          resolve(url);
        });
      }
    );
  });
}
export default function Rte(props?: any) {
  const tags = [
    { id: 1, value: "JavaScript" },
    { id: 2, value: "TypeScript" },
    { id: 3, value: "Mantine" },
    { id: 3, value: "Next" },
  ];
  const { data } = useSWR("students", fetcher);
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = data && mentionChar === "@" ? data : tags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
      },
    }),
    []
  );
  return (
    <Center
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        height: "auto",
      }}
      p="sm"
    >
      {data && (
        <RichText
          placeholder="use @ to mention students"
          style={{ width: "100%" }}
          value={props.value}
          onChange={props.onChange}
          onImageUpload={uploadImage}
          mentions={mentions}
        />
      )}
      {/* <ComposedButton text={"Post"} onClick={mutate} style={{ mt: "xl" }} /> */}
    </Center>
  );
}
const fetcher = async () => {
  try {
    const response: any = await axios.post("/api/all-students", {});
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
