import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import UpdatePost from "./UpdatePost";
import { deletePost } from "../store";


const Post = ({ post, deletePost}) => {
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
     <Link to='/profile'><button onClick={()=> deletePost(post)}>Delete Review</button></Link> 
     <Route component={UpdatePost} />
     </div> 
    )
}


const mapState = (state, otherProps) => {
        const post = state.posts.find((post) => post.id === otherProps.match.params.id * 1)
        return {
            post
        }
    }

const mapDispatchToProps = (dispatch) => {
    return {
      deletePost: (post) => dispatch(deletePost(post))
    }
  }

  export default connect(
    mapState,
    mapDispatchToProps 
 )(Post)





// class Post extends Component {
//     constructor() {
//        super(); 
//     }
// render () {
//    const {post} = this.props
// return (
//     <div>
//        <div>
//           {post.title} 
//        </div>
//        <div>
//            {post.location}
//        </div>
//        <div>
//            {post.wifi}
//        </div>
//        <div>
//            {post.review}
//        </div>
//     <button onClick={()=> deletePost(post)}>Delete Review</button>  
//     <Route component={UpdatePost} />
//     </div>
//    ) 
//   }
// }

// const mapState = (state, otherProps) => {
//     const post = state.posts.find((post) => post.id === otherProps.match.params.id * 1)
//     return {
//         post
//     }
// }

// export default connect(mapState)(Post)