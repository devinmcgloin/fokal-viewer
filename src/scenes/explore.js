import React, { Component } from "react";
import PropTypes from "prop-types";
import MapGL, { NavigationControl, Marker } from "react-map-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

import Measure from "react-measure";

class ExploreScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 37.805,
                longitude: -122.447,
                zoom: 15.5,
                bearing: 0,
                pitch: 0
            },
            width: 500,
            height: window.innerHeight
        };
    }

    renderCityMarker = (city, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={city.longitude}
                latitude={city.latitude}
            >
                <CityPin
                    size={20}
                    onClick={() => this.setState({ popupInfo: city })}
                />
            </Marker>
        );
    };

    render() {
        const { viewport } = this.state;

        return (
            <Measure
                bounds
                onResize={contentRect => {
                    this.setState({
                        width: contentRect.bounds.width
                    });
                }}
            >
                {({ measureRef }) => (
                    <div ref={measureRef} className={"vw-100"}>
                        <MapGL
                            {...Object.assign(viewport, {
                                width: this.state.width,
                                height:
                                    this.state.height -
                                    (this.state.width < 480 ? 49 : 67)
                            })}
                            onViewportChange={viewport => {
                                //const {
                                //width,
                                //height,
                                //latitude,
                                //longitude,
                                //zoom
                                //} = viewport;
                                this.setState({ viewport: viewport });
                                // call `setState` and use the state to update the map.
                            }}
                        >
                            <div
                                style={{ position: "absolute" }}
                                className="pa2"
                            >
                                <NavigationControl
                                    onViewportChange={viewport =>
                                        this.setState({ viewport: viewport })}
                                />
                            </div>
                            <Marker
                                latitude={37.78}
                                longitude={-122.41}
                                offsetLeft={-20}
                                offsetTop={-10}
                            >
                                <CityPin size={20} />
                            </Marker>
                        </MapGL>
                    </div>
                )}
            </Measure>
        );
    }
}

ExploreScene.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

const ICON = `
M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z
`;
//const ICON_BLACK = `
//M78,33C78,17.5,65.5,5,50,5S22,17.5,22,33c0,0.1,0,0.3,0,0.4h0c0,1.1,0.1,2.4,0.3,3.8c0,0.1,0,0.1,0,0.2
//C25.2,55.9,45.1,92,45.1,92l0,0c0.9,1.8,2.8,3,4.9,3s4-1.2,4.9-3l0,0c0,0,19.9-36.1,22.7-54.7c0-0.1,0-0.1,0-0.2
//c0.2-1.4,0.3-2.6,0.3-3.8h0C78,33.3,78,33.1,78,33z M50,48.5c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15
//C65,41.8,58.3,48.5,50,48.5z`;

let pinStyle = {
    cursor: "pointer",
    fill: "#d00",
    stroke: "none"
};

class CityPin extends Component {
    render = () => {
        const { size = 20, onClick } = this.props;

        return (
            <svg
                height={size}
                viewBox="0 0 24 24"
                style={{
                    ...pinStyle,
                    transform: `translate(${-size / 2}px,${-size}px)`
                }}
                onClick={onClick}
            >
                <path d={ICON} />
            </svg>
        );
    };
}

CityPin.propTypes = {
    size: PropTypes.number,
    onClick: PropTypes.func
};

export { ExploreScene };
