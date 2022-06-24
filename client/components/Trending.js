import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/styles";

const Trending = () => {
  const { businesses: restaurants } = useSelector(
    ({ restaurants }) => restaurants
  );
  const auth = useSelector(({ auth }) => auth);
  const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  if (!restaurants) {
    return null;
  }
  return (
    // <div>
    //   <h2 style={{ textAlign: "center" }}>
    //     {" "}
    //     Here are LoopedIn's Top Trending Restaurants!{" "}
    //   </h2>
    //   <Box sx={{ width: 800, minHeight: 829 }}>
    //     <Masonry columns={3} spacing={2}>
    //       {restaurants.map((restaurant, index) => (
    //         <div key={index}>
    //           <Link to={`/trending/${restaurant.alias}`}>
    //             <Label>{restaurant.name}</Label>
    //             <img
    //               src={`${restaurant.image_url}?w=162&auto=format`}
    //               srcSet={`${restaurant.image_url}?w=162&auto=format&dpr=2 2x`}
    //               alt={restaurant.title}
    //               loading="lazy"
    //               style={{
    //                 borderBottomLeftRadius: 4,
    //                 borderBottomRightRadius: 4,
    //                 display: "block",
    //                 width: "100%",
    //               }}
    //             />
    //           </Link>
    //         </div>
    //       ))}
    //     </Masonry>
    //   </Box>
    // </div>

    <>
      {/* <div className="box">
        <div className="wave -one" />
        <div className="wave -two" />
        <div className="wave -three" />
        <div className="title">{auth.city}</div>
      </div> */}

      <h1 class="title111">BEST Restaurants </h1>

      <section className="hero-section">
        <div className="card-grid">
          {restaurants.map((restaurant, index) => (
            <Link
              to={`/trending/${restaurant.alias}`}
              className="card"
              key={index}
            >
              <div
                className="card__background"
                style={{
                  backgroundImage: `url(${restaurant.image_url})`,
                }}
              />
              <div className="card__content">
                <p className="card__category">{restaurant.name}</p>
                <h3 className="card__heading">{restaurant.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Trending;
