import React from "react";
import { useSelector } from "react-redux";
import ByCity from "./ByCity";
import AllRestaurants from "./AllRestaurants"
import Trending from "./Trending";

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  console.log(auth);
  console.log(restaurants)

  if (!restaurants) {
    return null;
  }

  return (
    
      <div className="landing">
        
        <Trending />
     
        <h2>Here is a list of top restuarants in BROOKLYN, NY!</h2>
    
      <ByCity/>
      
        <h2>Here is a list of all RESTAURANTS!</h2>
    
      <AllRestaurants />

      </div>
    
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
