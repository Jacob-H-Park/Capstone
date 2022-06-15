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
           location: post ? post.location: '',
           wifi: post ? post.wifi: ''
       }
       this.handleChange = this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this) 
    }
    componentDidUpdate(prevProps) {
        if(this.props.post !== prevProps.post) {
            this.setState({
                post: this.props.post.review,
                title: this.props.post.title,
                location: this.props.post.location,
                wifi: this.props.post.wifi
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
        console.log("this is post" , this.props)
        this.props.updatePost(this.props.post.id, {...this.state})
        
    }
   render() {
      const {review, title, location, wifi} = this.state
      const {handleSubmit, handleChange} = this
      return (
          <div className="edit">
             <form className='addform' onSubmit={handleSubmit}>
                <input className='title'
                  name="title" 
                  type="text"
                  value={title || ""}
                  placeholder="Post Title"
                  onChange={handleChange}
                />
                <input className='location'
                  name="location"
                  type="text"
                  value={location || ""}
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
                  name="review"
                  type="text"
                  value={review || ""}
                  placeholder="Share your review..."
                  onChange={handleChange}
                />

             <button className="reviewbutton" onClick={handleSubmit}>Edit Review</button>
             </form> 
          </div>
      )
   } 
}

const mapState = (state, {match}) => {
    const id = match.params.id;
    console.log("this is id" , id)
    
    const post = state.posts.find((post) => post.id === id * 1) 
    console.log("this is mapState Post", post)
    return {
        post
    }
        
        
}


const mapDispatch = (dispatch) => {
    return {
        updatePost: (postId, post) => dispatch(updatePost(postId, post))
    }
}

export default connect(mapState, mapDispatch)(UpdatePost)