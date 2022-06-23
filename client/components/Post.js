import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route} from "react-router-dom";
import UpdatePost from "./UpdatePost";
import { deletePost } from "../store";
import CustomizedDialogs from "./EditDialog";
import Card from '@mui/material/Card';
import { Button, CardContent, Typography, Grid, Box } from "@mui/material";
import history from "../history";

const Post = ({ post, deletePost}) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className="editPost">
        <div className="backbutton"> <Link className="backlink" to="/profile">
          <i className="backlink" class="fa-solid fa-circle-arrow-left fa-2x"></i>{" "}
        </Link> </div>
        <h1 className="editheader">
            Change Your Mind?
         </h1>
        <Grid 
        container spacing = {12}
        direction="row"  
        justifyContent="center"
        alignItems="space-around"
        > 
        <Grid item s={4}>
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
     <Link to='/profile'><Button sx={{mb:3, ml:19, mr: 2}} variant="outlined" onClick={()=> deletePost(post)}><i class="fa-solid fa-trash-can"></i></Button></Link> 
     <CustomizedDialogs open={open} setOpen={setOpen}>
     <UpdatePost post={post} open={open} setOpen={setOpen} />
     </CustomizedDialogs>
     </Grid>
       </Card>
       </Grid>
     </Grid>
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