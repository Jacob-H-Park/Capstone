import React from "react";
import { useSelector } from "react-redux";
import ByCity from "./ByCity";
import AllRestaurants from "./AllRestaurants"

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  console.log(auth);

  if (!restaurants) {
    return null;
  }

  return (
    <>
      <div className="landing">
        <h1> Welcome {auth.username}</h1>
        <h2> {auth.username} , we recommend the following resturants! </h2>
        <ul>
          {restaurants.map((place) => {
            if (place.ranking < 4)
              return (
                <li key={place.id}>
                  Restaurant Name: {place.name}
                  <br></br>
                  Category: {place.category}
                  <br></br>
                  Restaurant Address {place.address}
                  <br></br>
                  City: {place.city}
                  <br></br>
                  State: {place.state}
                  <br></br>
                  RANKING: {place.ranking}
                  <br></br>
                  <img className="logos" src={place.image} />
                  <button />
                  <br></br>
                </li>
              );
          })}
        </ul>
      </div>
      <div className="landing">
        <h2>Here is a list of top restuarants in BROOKLYN, NY!</h2>
      </div>
      <ByCity className="landing"/>
      <div className="landing">
        <h2>Here is a list of all RESTAURANTS!</h2>
      </div>
      <AllRestaurants className="landing"/>
    </>
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
