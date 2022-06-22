import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [
        {
          latitude: props.restaurant.coordinates.latitude,
          longitude: props.restaurant.coordinates.longitude,
        },
      ],
    };
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
        />
      );
    });
  };

  render() {
    const mapStyles = {
      maxWidth: "450px",
      height: "350px",
    };
    const containerStyle = {
      maxWidth: "450px",
      height: "50px",
    };
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={{
          lat: this.props.restaurant.coordinates.latitude,
          lng: this.props.restaurant.coordinates.longitude,
        }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
})(GoogleMap);
