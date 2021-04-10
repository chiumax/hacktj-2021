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
