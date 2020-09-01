import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class EventDetailsMap extends Component {
  render() {
    let marker;
    const renderMarkers = (map, maps) => {
      marker = new maps.Marker({
        position: this.props.latlng,
        map: map,
        animation: maps.Animation.BOUNCE,
      });
      setTimeout(() => {
        marker.setAnimation(null);
      }, 1500);
    };
    return (
      <div style={{ height: '20.5rem', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCBz-5RIvlMTb-ghvy_VoXxCxQlaJLV-AY' }}
          defaultCenter={this.props.latlng}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
          {marker}
        </GoogleMapReact>
      </div>
    );
  }
}

export default EventDetailsMap;
