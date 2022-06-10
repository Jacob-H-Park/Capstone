import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import UpdatePost from "./UpdatePost";

class Post extends Component {
    constructor() {
       super(); 
    }

render () {
   const {post} = this.props
return (
    <div>
       <div>
          {post.title} 
       </div>
       <div>
           {post.location}
       </div>
       <div>
           {post.wifi}
       </div>
       <div>
           {post.review}
       </div>
    <Route component={UpdatePost} />
    </div>
   ) 
  }
}

const mapState = (state, otherProps) => {
    const post = state.posts.find((post) => post.id === otherProps.match.params.id * 1)
    return {
        post
    }
}

export default connect(mapState)(Post)