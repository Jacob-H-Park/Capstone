import React from 'react'
import {connect} from 'react-redux'
import { deletePost } from '../store'
import UpdatePost from './UpdatePost'
import {Link} from 'react-router-dom';


const Posts = ({ posts }) => {
   return (
      <div>
       <div>
          <ul>
           {
             posts.map(post => {
               return (
                 <div key={post.id}>
                  <h4> {post.title} </h4>
                    <span>Location: {post.location}</span>
                  <div>  {post.review} </div>
                  <div> {post.wifi}</div>
                
                  
                 </div>  
               )  
             })  
           }
          </ul> 
       </div> 
      </div> 
   ) 
}



export default connect(
   state => state,
)(Posts)