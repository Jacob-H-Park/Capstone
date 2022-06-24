import { StarRateRounded } from "@mui/icons-material";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { createPost } from "../store";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      title: "",
      wifi: "",
      userId: props.auth.id ? props.auth.id : 0,
      restaurantName: props.restaurant.alias ? props.restaurant.alias : "",
      uploadedFile: "",
      imageUrl: "",
    };
    this.initialState = this.state;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost({ ...this.state });
    this.setState(() => this.initialState);
  }

  async handleFile(ev) {
    ev.preventDefault();
    const file = ev.target.files[0];
    console.log("file selected", file);
    this.setState({ uploadeFile: file });
    console.log("uploaded file", this.state.uploadedFile);

    //Amazon S3
    //get the secure URL from the server to connect to the s3 bucket
    const { url } = (await axios.get("/s3Url")).data;

    //upload image to the s3 bucket - POST? PUT?
    await axios.put(
      `${url}`,
      //ask if uploadedFile and headers can be passed in combined instead of two different objects
      file,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    this.setState({ imageUrl: url.split("?")[0] });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { review, restaurantName, title, wifi, imageUrl } = this.state;
    console.log(imageUrl);
    const { handleSubmit, handleChange, handleFile } = this;

    return (
      <div>
        <form className="addform" onSubmit={handleSubmit}>
          <input
            className="title"
            style={{ color: "black" }}
            name="title"
            value={title}
            type="text"
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            className="location"
            style={{ color: "black" }}
            name="location"
            value={restaurantName}
            type="text"
            placeholder="Location"
            onChange={handleChange}
          />

          <select
            name="wifi"
            value={wifi || ""}
            placeholder="Wifi Availability"
            onChange={handleChange}
          >
            <option value="">Wifi Availability?</option>
            <option value="Free-Wifi">Free-Wifi</option>
            <option value="Wifi Not Available">Wifi Not Available</option>
            <option value="Wifi Costs Extra">Wifi Costs Extra</option>
          </select>

          <label htmlFor="upload-image-file" />
          <input
            accept="image/*"
            id="upload-image-file"
            type="file"
            onChange={handleFile}
          />

          <textarea
            style={{ color: "black" }}
            name="review"
            value={review}
            type="text"
            placeholder="Share your Review.."
            onChange={handleChange}
          ></textarea>

          {imageUrl ? (
            <div>
              <img
                display="flex"
                style={{
                  height: "200px",
                  maxWidth: "100%",
                }}
                src={imageUrl}
                alt="not loaded"
              />
            </div>
          ) : (
            ""
          )}
          <button className="reviewbutton">Post</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createPost: (post) => dispatch(createPost(post, history)),
  };
};

export default connect(mapState, mapDispatchToProps)(CreatePost);
