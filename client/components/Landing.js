import React from "react";
import { useSelector } from "react-redux";

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
            if (place.ranking < 5)
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
                  <br></br>
                </li>
              );
              
          })}
        </ul>
      </div>
      <div className="landing" >
        <h2>Here is a list of top restuarants in BROOKLYN, NY!</h2>
        <ul>
          {restaurants.map((place) => {
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
                  <br></br>
                </li>
              );
              
          })}
        </ul>
      </div>
    </>
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
