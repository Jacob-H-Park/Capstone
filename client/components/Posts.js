import React from 'react'
import {connect} from 'react-redux'
import { deletePost } from '../store'
import UpdatePost from './UpdatePost'
import {Link} from 'react-router-dom';


const Posts = ({ posts, deletePost }) => {
   return (
      <div>
       <div>
          <ul>
           {
             posts.map(post => {
               return (
                 <div key={post.id}>
                  <Link to= {`/posts/${post.id}`}><h4> {post.title} </h4></Link>
                    <span>Location: {post.location}</span>
                  <div>  {post.review} </div>
                  <div> {post.wifi}</div>
                  <button onClick={()=> deletePost(post)}>Delete Review</button>
                 </div>  
               )  
             })  
           }
          </ul> 
       </div> 
      </div> 
   ) 
}


const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (post) => dispatch(deletePost(post))
  }
}

export default connect(
   state => state,
   mapDispatchToProps 
)(Posts)