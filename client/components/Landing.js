import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { fetchRestaurants } from "../store/restaurants";

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  if (!restaurants) {
    return null;
  }
  return (
    <>
      <div>Landing Page</div>
      <ul>
        {restaurants.map((place) => {
          return <li key={place.id}>{place.name}</li>;
        })}
      </ul>
    </>
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
