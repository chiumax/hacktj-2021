import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './map-style.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w';

const Mapp = ({ filters, setFilters, update, setUpdate }) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-77.0369);
  const [lat, setLat] = useState(38.9072);
  const [zoom, setZoom] = useState(11);
  const [snapshot, setSnapshot] = useState({});
  const [mapObj, setMapObj] = useState();

  const colors = [
    '#1A2E33',
    '#A58D7C',
    '#FF6F3F',
    '#E5D8CE',
    '#FFAF3F',
    '#FFFFFF',
    '#F79F66',
    '#FF3F46',
    '#1A2E33',
    '#FFFFFF',
  ];

  // listener for update
  useEffect(() => {
    if (update == true) {
      // reset layers
      let keys = Object.keys(snapshot);
      if (keys.length > 0) {
        for (let key in keys) {
          mapObj.removeLayer(key);
        }
      }
      setUpdate(false);
      setSnapshot(filters);
      console.log(filters);
      // apply the filters here or something
      // when update, remove all existing layers and re gen them
      // use a snapshot hook
      // filter years
      // filter party
      // filter fatality

      keys = Object.keys(filters);
      let count = 0;
      for (let key in keys) {
        let filter = ['any'];
        // filter years
        for (let year in filters[key].year) {
          filter.push(['==', 'YEAR', String(filters[key].year[year])]);
        }
        // filter party
        for (let party in filters[key].party) {
          party = filters[key].party[party];
          if (party == 'cycle') {
            filter.push(['>', 'TOTAL_BICYCLES', 0]);
          }
          if (party == 'pedestrian') {
            filter.push(['>', 'TOTAL_PEDESTRIANS', 0]);
          }
        }
        // filter fatality
        for (let fatality in filters[key].fatality) {
          fatality = filters[key].fatality[fatality];
          if (fatality == 'major') {
            filter.push(['>', 'MAJORINJURIES_PEDESTRIAN', 0]);
            filter.push(['>', 'MAJORINJURIES_BICYCLIST', 0]);
          }
          if (fatality == 'minor') {
            filter.push(['>', 'MINORINJURIES_PEDESTRIAN', 0]);
            filter.push(['>', 'MINORINJURIES_BICYCLIST', 0]);
          }
        }

        mapObj.addLayer({
          id: key,
          type: 'circle',
          source: 'route',
          paint: {
            'circle-radius': 5,
            'circle-color': colors[count],
          },
          filter: filter,
        });
        console.log('layer added!!!');
        count++;
      }
    }
  }, [update]);

  // general use effect
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    setMapObj(map);

    map.on('load', function () {
      map.addSource('route', {
        type: 'geojson',
        data: './crashes_2021.geojson',
      });

      // map.addLayer({
      //   id: 'res',
      //   type: 'circle',
      //   source: 'route',
      //   paint: {
      //     'circle-radius': 5,
      //     'circle-color': colors[0],
      //   },
      //   filter: ['any', ['==', 'YEAR', '2021']],
      // });
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
