import React from "react";
import { useSelector } from "react-redux";
import Table from "./Table";
import AnimatedPage from "./AnimatedPage";

const Map = () => {
  const auth = useSelector(({ auth }) => auth);

  return (
    <div>
      <Table />
    </div>
  );
};

export default Map;
