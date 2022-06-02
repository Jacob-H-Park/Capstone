import React from "react";
import { useSelector } from "react-redux";
import ByCity from "./ByCity";
import AllRestaurants from "./AllRestaurants"
import Trending from "./Trending";
import Favorites from "./Favorites"

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
    
        <ByCity/>
    
       <AllRestaurants />
       
       <Favorites />

      </div>
    
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
