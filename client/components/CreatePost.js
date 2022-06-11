import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../store";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      location: "",
      title: "",
      wifi: "",
      userId: props.auth.id ? props.auth.id : 0
    };
    this.initialState = this.state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost({ ...this.state });
    this.setState(() => this.initialState)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { review, location, title, wifi } = this.state;
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

          <select
           name='wifi'
           value={wifi || ""}
           placeholder='Wifi Availability'
           onChange={handleChange}
           >
            <option value=''>Select Wifi Availability</option> 
            <option value='Free-Wifi'>Free-Wifi</option>
            <option value='Wifi Not Available'>Wifi Not Available</option>
            <option value='Wifi Costs Extra'>Wifi Costs Extra</option>
            
           </select>

          <textarea
            style={{ color: "black" }}
            name="review"
            value={review}
            type="text"
            placeholder="Share your Review.."
            onChange={handleChange}
          ></textarea>

          <button>Share Review</button>
        </form>
      </div>
    );
  }
}

const mapState = ({auth}) => {
  return {auth}
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createPost: (post) => dispatch(createPost(post, history)),
  };
};

export default connect(mapState, mapDispatchToProps)(CreatePost);
