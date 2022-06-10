import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Route } from "react-router-dom";
import Posts from "./Posts";


const Profile = () => {
  const auth = useSelector(({ auth }) => auth);
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${auth.city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
      await axios.get(url).then((response) => {
        setData(response.data);
      });
    };
    fetchData();
  }, []);

  let today = new Date();
  let time = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let hours = today.getHours();
  let month = today.getMonth();
  let day = today.getUTCDate();
  let year = today.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const displayGreeting = () => {
    if (hours < 11) {
      return "Good morning";
    }
    if (hours > 17) {
      return "Good evening";
    } else {
      return "Good afternoon";
    }
  };
  return (
    <div>
      <div className="greeting">
        <p>Welcome, {auth.username},</p>
        <p>
          {months[month]} {day}, {year}
        </p>
        <p>
          {displayGreeting()}, {auth.username.toUpperCase()}
        </p>
        <p>{time}</p>
      </div>
      <div className="weather">
        <p>
          Weather in {auth.city}, {auth.state}:
        </p>
        <p>{data.main ? <span>{data.main.temp.toFixed()}°F</span> : null}</p>
        <div>
          <p>{data.weather ? <span>{data.weather[0].main}</span> : null}</p>
        </div>
      </div>
      <div>
      <h2>My Reviews</h2>  
      <Route component={Posts} />
      </div>
    </div>
  );
};

export default Profile;
