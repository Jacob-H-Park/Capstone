import { StarRateRounded } from "@mui/icons-material";
import React, { Component } from "react";
import { connect } from "react-redux";
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

    };
    this.initialState = this.state;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost({ ...this.state });
    this.setState(() => this.initialState);
    this.props.setOpen(false)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { review, restaurantName, title, wifi } = this.state;
    const { handleSubmit, handleChange } = this;
    const {username} = this.props.auth
    console.log(this.props)
    return (
      <div>
        <form className='addform' onSubmit={handleSubmit}>
          <input className="title"
            style={{ color: "black" }}
            name="title"
            value={title}
            type="text"
            placeholder="Title"
            onChange={handleChange}
          />
          <input className="location"
            style={{ color: "black" }}
            name="location"
            value={restaurantName}
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
            <option value=''>Wifi Availability?</option> 
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

          <button className='reviewbutton'>Post</button>
        </form>
      </div>
    );
  }
}

const mapState = ({auth}) => {
  return {auth}
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createPost: (post) => dispatch(createPost(post, history)),
  };
};

export default connect(mapState, mapDispatchToProps)(CreatePost);
