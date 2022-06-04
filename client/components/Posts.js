import React from 'react'
import {connect} from 'react-redux'


const Posts = ({ posts }) => {
   return (
      <div>
       <h2>My Feed</h2> 
       <div>
          <ul>
           {
             posts.map(post => {
               return (
                 <div key={post.id}>
                  <h4> {post.title} </h4>
                    <span>Location: {post.location}</span>
                  <div>  {post.textpost} </div>
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
   state => state 
)(Posts)