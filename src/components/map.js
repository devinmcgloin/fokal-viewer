/* global process */

import React from 'react';
import PropTypes from 'prop-types';
import Tangram from 'tangram';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class MapPointView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.lat,
      lng: props.lng,
    };
    this.mapEl = 'map';
  }

  componentDidMount() {
    const map = L.map(this.mapEl);
    const layer = Tangram.leafletLayer({
      scene: process.env.PUBLIC_URL + '/scene.yml',
      //attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>',
      attributionControl: false,
      interactive: false,
    });
    layer.addTo(map);
    map.setView([this.state.lat, this.state.lng], 15);
  }

  render() {
    return (
      <div
        className={'w-100 h-100'}
        ref={ref => {
          this.mapEl = ref;
        }}
      />
    );
  }
}

MapPointView.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
};

export { MapPointView };
