import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [uploadedFile, setUploadedFile] = useState("null");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    //get the secure URL from the server to connect to the s3 bucket
    const { url } = (await axios.get("/s3Url")).data;

    //upload image to the s3 bucket - POST? PUT?
    await axios.put(
      `${url}`,
      //ask if uploadedFile and headers can be passed in combined instead of two different objects
      uploadedFile,
      {
        headers: { "Content-Type": "multipart/form-data" },
        // body: { uploadedFile },
      }
    );

    //set imageUrl to use it for image rendering on the front-end
    setImageUrl(url.split("?")[0]);
  };

  const fileSelected = (ev) => {
    const file = ev.target.files[0];
    console.log(file);
    console.log(ev.target.files);
    setUploadedFile(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="upload-image-file" />
      <input
        accept="image/*"
        id="upload-image-file"
        type="file"
        onChange={fileSelected}
      />
      <button>Upload</button>
      {imageUrl ? (
        <div style={{ height: "150px", width: "150px" }}>
          <img src={imageUrl} />
        </div>
      ) : (
        ""
      )}
    </form>
  );
};

export default UploadImage;
