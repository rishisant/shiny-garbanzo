import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import {raise_admin_bar} from './HomeFunctions';
import './AltStyles.css';
import {useNavigate} from 'react-router-dom';

const mapStyles = {
  width: "1050px",
  height: "550px",
};

const mapSectionStyles = {
  position: "relative",
  display: "run-in",
  height: "600px",
  width: "1050px",
};

const mapContainerStyles = {
  position: "relative",
  display: "run-in",
  height: "600px",
  width: "1050px",
  marginLeft: "auto",
  marginRight: "auto",
};

const mapTitleStyles = {
  // center the textbox and make the box bigger, font size= 25px
  fontSize: "25px",
  fontFamily: "Roboto Slab",
  textAlign: "center",
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  borderRadius: "20px",
  padding: "5px",
  margin: "5px",
  marginTop: "20px",
  marginBottom: "20px",
  width: "30%",
  marginLeft: "auto",
  marginRight: "auto",
}


export class MapContainer extends Component {
  
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  

  render() {
    // const navigate = useNavigate();

    return (
      
      <div>

        <img id="mainlogo3" src={require('./components/img/hss_transparent.png')} alt="Logo"></img>

        <div className="textbut1">
                The map below shows the locations of all of our stores. Click on a marker to see the address and phone number of the store.
        </div>

        <div className="mapcontainer" style={mapContainerStyles}>
          <h2 style={mapTitleStyles}>Underground Sbisa</h2>
          <Map id="map"
            google={this.props.google}
            zoom={16}
            style={mapStyles}
            initialCenter={{
              lat: 30.61789,
              lng: -96.34385,
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={
                "Underground Sbisa -- 233 Houston St, College Station, TX 77843"
              }
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

        <div className="mapcontainer" style={mapContainerStyles}>
        <h2 style={mapTitleStyles}>Polo Road</h2>
          <Map id="map"
            google={this.props.google}
            zoom={16}
            style={mapStyles}
            initialCenter={{
              lat: 30.6235,
              lng: -96.33784,
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={
                "Houston Street Subs -- Polo Road -- 322 Polo Rd, College Station, TX 77843"
              }
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

        <div className="mapcontainer" style={mapContainerStyles}>
        <h2 style={mapTitleStyles}>West Campus</h2>
          <Map id="map3"
            google={this.props.google}
            zoom={16}
            style={mapStyles}
            initialCenter={{
              lat: 30.6112,
              lng: -96.34887,
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={
                "Houston Street Subs -- West Campus -- 336 Olsen Blvd Building 1522, College Station, TX 77843"
              }
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

        

        <div class="homebutton" id="admin_panel" onClick={raise_admin_bar}>Admin Panel</div>

        <div id="spacer" style={{marginBottom: "100px", visibility:'hidden'}}>asdas</div>
        
            <div class="textbox" id="admin_textbox">Text Box</div>
            {/* <p class="backtest">;{this.state.apiResponse}</p> */}
            <div id="adminpanel">
                <panelbig>ADMIN PANEL</panelbig>
                <img class="admin_button" id="serverlogo" src={require('./components/img/home_transparent.png')} onClick={() => window.location.href = "/"} alt="Home Logo"></img>
                <paneltext>RETURN HOME</paneltext>
                {/* <img class="admin_button" id="reportslogo" src={require('./components/img/reports_transparent.png')}></img> */}
            </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCrqSeuM6dYiOnJt2vFZ9oRUUnGFrkYVj4",
})(MapContainer);
