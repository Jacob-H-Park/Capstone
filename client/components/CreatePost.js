import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../store";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textpost: "",
      location: "",
      title: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost({ ...this.state });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { textpost, location, title } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            style={{ color: "black" }}
            name="title"
            value={title}
            type="text"
            placeholder="Post Title"
            onChange={handleChange}
          />
          <input
            style={{ color: "black" }}
            name="location"
            value={location}
            type="text"
            placeholder="Location"
            onChange={handleChange}
          />
          <textarea
            style={{ color: "black" }}
            name="textpost"
            value={textpost}
            type="text"
            placeholder="Share your experience.."
            onChange={handleChange}
          ></textarea>
          <button>Create Post</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createPost: (post) => dispatch(createPost(post, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreatePost);
