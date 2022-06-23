
import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';

const Trending= () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));
  
      if (!restaurants) {
          return null;
        }

          return (
              <div>
               
                <h2 style={{textAlign:"center"}}> Here are LoopedIn's Top Trending Restaurants! </h2>
                <Box sx={{ width: 1370, minHeight: 829 }}>
                            <Masonry columns={4} spacing={2}>
                              
                              {restaurants.map((restaurant, index) =>  (
                                
                                <div key={index}>
                                  <Link to={`/trending/${restaurant.alias}`}>
                                  <Label>{restaurant.name}</Label>
                                  <img
                                    src={`${restaurant.image_url}?w=162&auto=format`}
                                    srcSet={`${restaurant.image_url}?w=162&auto=format&dpr=2 2x`}
                                    alt={restaurant.title}
                                    loading="lazy"
                                    style={{
                                      borderBottomLeftRadius: 4,
                                      borderBottomRightRadius: 4,
                                      display: 'block',
                                      width: '100%',
                                    }}
                                  />
                                  </Link>
                                </div>
                              ))}
                            </Masonry>
                          </Box>

                </div>
              )
          }
        
          export default Trending;


          /* { <ul >
                 {restaurants.map((restaurant,idx) => {
                   if(restaurant.rating === 5 && idx<15)
            return (
              <li key={restaurant.id}>
                Restaurant: {restaurant.name}
                <br></br>
                Rating: {restaurant.rating}
                <br></br>
                <Link to={`/trending/${restaurant.alias}`}> <img className="topPhoto"src={restaurant.image_url} ></img> </Link>
              </li>
            )
                 })}
                 </ul> } */