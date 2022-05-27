import React from "react";
import { useSelector } from "react-redux";

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);

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
