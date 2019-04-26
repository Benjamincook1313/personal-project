import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"
require('dotenv').config()
const { GOOGLE_API_KEY } = process.env

// const mapStyles = {
//  width: "10%",
//  height: "10%"
// };

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {},
      address: {}
    }//Shows the infoWindow to the selected place upon a marker
  }

  render() {
    return (
      <div className='map'>
        <Map 
          google={this.props.google}
          zoom={14}
          // style={style}
          initialCenter={{ lat: 40.6660611650049, lng: -111.86274923550752 }}
          //  initialCenter={this.state.address}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'Kenyatta International Convention Centre'}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
    
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer)