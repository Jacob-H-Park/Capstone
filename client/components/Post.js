import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import UpdatePost from "./UpdatePost";
import { deletePost } from "../store";
import CustomizedDialogs from "./EditDialog";
import Card from '@mui/material/Card';
import { Button, CardContent, Typography, Grid, Box } from "@mui/material";

const Post = ({ post, deletePost}) => {
   
    return (

        <Grid direction="column"  
        justify="center"
        alignItems="center"> 
       
        <Card  sx={{ maxWidth: 600, m:3, boxShadow: 3, variant: "outlined"}}>
        <CardContent>
        <Typography sx={{mb:-2, ml: 2, mt: -3, fontStyle: 'oblique'}} gutterBottom variant="h6" component="div">
            <h4> {post.title} </h4> 
        </Typography>
        <Typography sx={{mb:0, ml:2}} variant='subtitle2' >
            <div><i class="fa-solid fa-location-dot"></i> {post.restaurantName}</div>
            <div><i class="fa-solid fa-wifi"></i> {post.wifi}</div>
        </Typography>
        <Typography sx={{p:2}} variant="body2" color="text.secondary">
            <div>  {post.review} </div>
        </Typography>
        </CardContent>
    <Grid container justify="center" direction='row'>
     <Link to='/profile'><Button sx={{mb:3, ml:19, mr: 2}} variant="outlined" onClick={()=> deletePost(post)}>Delete Review</Button></Link> 
     <CustomizedDialogs>
     <Route component={UpdatePost} />
     </CustomizedDialogs>
     </Grid>
       </Card>
    </Grid>
    
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