import React from "react";
import { useSelector } from "react-redux";

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector( ({auth}) => auth)
  console.log(auth)
  
  if (!restaurants) {
    return null;
  }
  return (
    <>
    <div id="landing">
      <h1> Welcome {auth.username}</h1>
      <h2> {auth.username} , we recommend the following resturants! </h2>
      <ul>
        {restaurants.map((place) => {
          return <li key={place.id}>{place.name} {place.address}
            <img className="logos" src={place.image} />
           </li>;
       
          
        })}
      </ul>
      <h2> {auth.username} , the below restuarants are TRENDING near {auth.city} , {auth.state}! </h2>
      </div>
    </>
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
