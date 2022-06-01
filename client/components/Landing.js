import React from "react";
import { useSelector } from "react-redux";
import Table from "./Table";

const Landing = () => {
  const restaurants = useSelector(({ restaurants }) => restaurants);
  const auth = useSelector(({ auth }) => auth);
  console.log(auth);

  if (!restaurants) {
    return null;
  }
  return (
    <>
      <div id="landing">
        <h1> Welcome {auth.username}</h1>
      </div>
    </>
  );
};

// const mapState = ({ restaurants }) => ({ restaurants });
// export default connect(mapState)(Landing);

export default Landing;
