
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
                
                <h2> {auth.username} , Loopedin recommends the following resturants in New York City! </h2>
                <div class="row">
              <div class="column">
                <Link to={`/trending/${restaurants[0].alias}`}>
                <img src={restaurants[0].image_url} style={{width:"100%"}}/>
                </Link>
              </div>
             
              <div class="column">
                <Link to={`/trending/${restaurants[1].alias}`}>
                <img src={restaurants[1].image_url} style={{width:"100%"}} />
                </Link>
              </div>
             
              <div class="column">
                <Link to={`/trending/${restaurants[9].alias}`}>
                <img src={restaurants[9].image_url} style={{width:"100%"}} />
                </Link>
              </div>
            
            </div> 
               
               </div> )}
                
              
              
            
        

          export default Recommended;

      
      
 
  
