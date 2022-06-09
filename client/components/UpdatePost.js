import React from "react";
import {connect} from "react-redux"
import { updatePost } from "../store";

export class UpdatePost extends React.Component {
    constructor(props) {
       super(props);
       const { post } = this.props;
       this.state = {
           review: post ? post.review : '',
           title: post ? post.title: '',
           location: post ? post.location: ''
       }
       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this) 
    }
    componentDidUpdate(prevProps) {
        if(this.props.post !== prevProps.post) {
            this.setState({
                post: this.props.post.review,
                title: this.props.post.title,
                location: this.props.post.location
            })
        }
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit(evt) {
        evt.preventDefault()
        this.props.updatePost(this.props.post.id, {...this.state})
    }
   render() {
      const {review, title, location} = this.state
      const {handleSubmit, handleChange} = this
      return (
          <div>
             <form onSubmit={handleSubmit}>
                <input
                  name="title" 
                  type="text"
                  value={title || ""}
                  placeholder="Post Title"
                  onChange={handleChange}
                />
                <input 
                  name="location"
                  type="text"
                  value={location || ""}
                  placeholder="Location"
                  onChange={handleChange}
                />
                <textarea
                  name="review"
                  type="text"
                  value={review || ""}
                  placeholder="Share your review..."
                  onChange={handleChange}
                />

             <button onClick={handleSubmit}>Edit Review</button>
             </form> 
          </div>
      )
   } 
}

const mapState = (state, otherProps) => {
    const id = otherProps.match.params.id;
    return {
        post: state.posts.find((post) => post.id === id * 1)
    }
}

const mapDispatch = (dispatch) => {
    return {
        updatePost: (postId, post) => dispatch(updatePost(postId, post))
    }
}

export default connect(mapState, mapDispatch)(UpdatePost)