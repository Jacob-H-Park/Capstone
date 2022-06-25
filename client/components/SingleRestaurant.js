import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import CreatePost from "./CreatePost";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { Grid, Box } from "@mui/material";
import { List, ListItem } from "@mui/material";
import CustomizedDialogs from "./PostDialog";

const SingleRestaurant = () => {
  const { businesses: restaurants } = useSelector(
    ({ restaurants }) => restaurants
  );
  const posts = useSelector(({ posts }) => posts);
  const auth = useSelector(({ auth }) => auth.username);

  const { alias } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!restaurants || !posts) {
    return null;
  }

  const restaurant = restaurants.filter((place) => place.alias === alias)[0];
  const specificPosts = posts.filter(
    (post) => post.restaurantName === restaurant.alias
  );

  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ marginTop: "100px" }}>
      <AnimatedPage>
        <div className="container55">
          <div className="box">
            <div className="title">
              <span className="block" />
              <h1>{restaurant.name}</h1>
            </div>
            <div className="role">
              <div className="block" />
              <p>
                {restaurant.location["display_address"][0]}
                &nbsp;
                {restaurant.location["display_address"][1]}
              </p>
            </div>
          </div>
        </div>
        <div className="scene">
          <div id="plant" className="item" />
          <div id="mirror">
            <div
              id="mirror-content"
              style={{
                backgroundImage: `url(${restaurant.image_url})`,
              }}
            />
          </div>
          <div id="plant-2" className="item" />
          <div id="books" className="item">
            <div id="apple" className="item" />
          </div>
          <div id="plant-3" className="item" />
          <div id="clock" className="item" />{" "}
        </div>
        {/* <div id="mirror2">
          <GoogleMap restaurant={restaurant} />
        </div> */}
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
          style={{ marginTop: "-1400px" }}
        >
          <CreatePost open={open} setOpen={setOpen} restaurant={restaurant} />
        </CustomizedDialogs>
        <Grid item xs={5}>
          <List>
            {specificPosts.map((post) => {
              return (
                <ListItem>
                  <Card
                    sx={{
                      borderRadius: 10,
                      maxWidth: 600,
                      maxHeight: 400,
                      m: 2,
                      boxShadow: 3,
                      variant: "outlined",
                    }}
                  >
                    <CardHeader
                      sx={{ mb: -1 }}
                      style={{
                        background:
                          " linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
                      }}
                      avatar={<Avatar sx={{ bgcolor: "#009688" }}>C</Avatar>}
                      titleTypographyProps={{
                        variant: "h5",
                        fontStyle: "oblique",
                      }}
                      title={post.title}
                      subheader={post.createdAt.slice(0, 10)}
                    />
                    <CardContent>
                      <div key={post.id}>
                        <Typography sx={{ m: 1, ml: 2 }} variant="subtitle2">
                          <div>
                            <i class="fa-solid fa-location-dot"></i>{" "}
                            {post.restaurantName}
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

                        {post.imageUrl && (
                          <Box display="flex" alignItems="center">
                            <img
                              display="flex"
                              style={{
                                height: "150px",
                                maxWidth: "100%",
                              }}
                              src={post.imageUrl}
                            />
                          </Box>
                        )}
                      </div>
                    </CardContent>
                    <IconButton
                      sx={{ ml: 68, mb: 2, mt: 0 }}
                      aria-label="add to favorites"
                    ></IconButton>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </AnimatedPage>
    </div>
  );
};

export default SingleRestaurant;
