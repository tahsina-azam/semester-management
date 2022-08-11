import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../config/firebase";

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