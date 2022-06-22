
import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";



const Recommended= () => {
  const {businesses: restaurants} = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth)
  
  
      if (!restaurants) {
          return null;
        }
          return (
              <div>
                 <h1 style={{textAlign:"center"}}> Welcome {auth.username}</h1>
                <h2 style={{textAlign:"center"}}> Loopedin recommends the following resturants in New York City! </h2>

                <div class="row">
                  { restaurants.map( (restaurant,idx) => {
                    if(idx >4 && idx<8)
                      return(
                  
                        <div class="column">
                          <Link to={`/trending/${restaurant.alias}`}>
                          <img class="recommended" src={restaurant.image_url} style={{width:"100%",height:"300px"}}/>
                        </Link>
                      </div>
              
                    )
                }) 
            }
              </div>
               
               </div> )}
                
              
              
            
        

          export default Recommended;

      
      
 
  
