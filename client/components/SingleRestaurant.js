import React, { Component, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Posts from "./Posts";
import AnimatedPage from "./AnimatedPage";

import CreatePost from "./CreatePost";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

const SingleRestaurant = () => {
  const { businesses: restaurants } = useSelector(
    ({ restaurants }) => restaurants
  );
  const posts = useSelector(({ posts }) => posts);
  const auth = useSelector(({ auth }) => auth.username);

  const { alias } = useParams();

  if (!restaurants || !posts) {
    return null;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurant = restaurants.filter((place) => place.alias === alias)[0];
  const specificPosts = posts.filter(
    (post) => post.restaurantName === restaurant.alias
  );

  return (
    <div style={{ marginTop: "90px" }}>
      <AnimatedPage>
        {/* <Posts/> */}
        <Link to="/">
          <i class="fa-solid fa-circle-arrow-left"></i>{" "}
        </Link>
        <h1 id="singlePlace"> {restaurant.name} </h1>
        <img id="singleImage" src={restaurant.image_url} />
        <ul>
          {specificPosts.map((post) => {
            return (
              <Card
                sx={{ maxWidth: 600, m: 2, boxShadow: 3, variant: "outlined" }}
              >
                <CardHeader
                  sx={{ mb: -1 }}
                  style={{ backgroundColor: "#b3e5fc" }}
                  avatar={<Avatar sx={{ bgcolor: "#009688" }}>C</Avatar>}
                  title={auth}
                  subheader={post.createdAt.slice(0, 10)}
                />
                <CardContent>
                  <div key={post.id}>
                    <Typography
                      sx={{ mb: -2, ml: 2, mt: -3, fontStyle: "oblique" }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      <h4> {post.title} </h4>
                    </Typography>
                    <Typography sx={{ mb: 0, ml: 2 }} variant="subtitle2">
                      <div>
                        <i class="fa-solid fa-location-dot"></i> {post.location}
                      </div>
                      <div>
                        <i class="fa-solid fa-wifi"></i> {post.wifi}
                      </div>
                    </Typography>
                    <Typography
                      sx={{ p: 2 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      <div> {post.review} </div>
                    </Typography>
                  </div>
                </CardContent>
                <IconButton
                  sx={{ ml: 68, mb: 2, mt: 0 }}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon />
                </IconButton>
              </Card>
            );
          })}
        </ul>
        <CreatePost restaurant={restaurant} />
      </AnimatedPage>
    </div>
  );
};

export default SingleRestaurant;
