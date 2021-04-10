import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./map-style.css";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w';

const Mapp = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(-77.0369);
    const [lat, setLat] = useState(38.9072);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('load', function () {
            map.addSource("route", {
                "type": "geojson",
                "data": "./crashes_2021.geojson"
            });
            console.log("brudda")

            map.addLayer({
                "id": "crashes-heat",
                "type": "heatmap",
                "source": "route",
                "maxzoom": 16,
                "paint": {
                    'heatmap-weight': {
                        'property': 'dbh',
                        'type': 'exponential',
                        'stops': [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                    'heatmap-intensity': {
                        'stops': [
                            [11, 1],
                            [15, 3]
                        ]
                    },
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0,
                        'rgba(33,102,172,0)',
                        0.2,
                        'rgb(103,169,207)',
                        0.4,
                        'rgb(209,229,240)',
                        0.6,
                        'rgb(253,219,199)',
                        0.8,
                        'rgb(239,138,98)',
                        1,
                        'rgb(178,24,43)'
                    ],
                    'heatmap-radius': {
                        'stops': [
                            [11, 15],
                            [15, 20]
                        ]
                    },
                    'heatmap-opacity': {
                        'default': 1,
                        'stops': [
                            [14, 1],
                            [15, 0]
                        ]
                    }
                }
            });

            map.addLayer({
                "id": "route",
                "type": "circle",
                "source": "route",
                "minzoom": 15,
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "#ff0000"
                }
            });
        });

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div className="map-container" ref={mapContainer} />
        </div>
    );
};

export default Mapp;
