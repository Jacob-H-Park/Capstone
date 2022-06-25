import React from 'react'
import {connect} from 'react-redux'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import {useParams} from "react-router-dom";



const Posts = ({ posts }) => {
  const auth = useSelector(({ auth }) => auth.username);
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);

  const {alias} = useParams();


  if(!restaurants || !posts) {
    return null
}

  const restaurant = restaurants.filter((place) => place.alias === alias)[0]
  const specificPosts = posts.filter((post) => post.restaurantName === restaurant.alias)
  


   return (
      <div>
       <div>
          <ul>
           {
             specificPosts.map(post => {
               return (
                <Card sx={{ maxWidth: 600, m:2, boxShadow: 3, variant: "outlined"}}>
                <CardHeader sx={{ mb: -1}} style={{backgroundColor: "#b3e5fc"}}
                  avatar= {
                  <Avatar sx={{ bgcolor: "#009688"}} >
                   C
                 </Avatar>
                  }
                  title={auth}
                  subheader={post.createdAt.slice(0,10)}
                />
                 <CardContent>
                 <div key={post.id}>  
                 <Typography sx={{mb:-2, ml: 2, mt: -3, fontStyle: 'oblique'}} gutterBottom variant="h6" component="div">
                  <h4> {post.title} </h4> 
                  </Typography>
                <Typography sx={{mb:0, ml:2}} variant='subtitle2' >
                  <div><i class="fa-solid fa-location-dot"></i> {post.location}</div>
                  <div><i class="fa-solid fa-wifi"></i> {post.wifi}</div>
                  </Typography> 
                 <Typography sx={{p:2}} variant="body2" color="text.secondary">
                  <div>  {post.review} </div>
                  </Typography>
                 </div>  
                 </CardContent> 
                 </Card>
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