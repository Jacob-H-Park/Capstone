import React from "react";
import { connect} from "react-redux"


export const Landing = ( {restaurants} ) => {
  console.log('hello',console.log(restaurants))
  return <div>Landing</div>;
};

const mapState = (state) => state;

export default connect(mapState)(Landing);