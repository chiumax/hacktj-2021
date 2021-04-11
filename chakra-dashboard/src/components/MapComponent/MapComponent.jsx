import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './map-style.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w';

const Mapp = ({ filters, setFilters, uu, setUU }) => {
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
    if (uu == 0) {
      return;
    }
    let keys;
    keys = Object.keys(filters);
    keys.forEach((key, index) => {
      let filter = ['all'];
      let subfilter = ['any'];
      subfilter = ['any'];

      // filter year
      for (let year in filters[key].year) {
        subfilter.push(['==', 'YEAR', String(filters[key].year[year])]);
      }
      if (subfilter.length > 1) {
        filter.push(subfilter);
      }

      // filter party
      subfilter = ['any'];
      for (let party in filters[key].party) {
        party = filters[key].party[party];
        if (party == 'cycle') {
          subfilter.push(['>', 'TOTAL_BICYCLES', 0]);
        }
        if (party == 'pedestrian') {
          subfilter.push(['>', 'TOTAL_PEDESTRIANS', 0]);
        }
      }
      if (subfilter.length > 1) {
        filter.push(subfilter);
      }

      // filter fatality
      subfilter = ['any'];
      for (let fatality in filters[key].fatality) {
        fatality = filters[key].fatality[fatality];
        if (fatality == 'fatal') {
          subfilter.push(['>', 'MAJORINJURIES_PEDESTRIAN', 0]);
          subfilter.push(['>', 'MAJORINJURIES_BICYCLIST', 0]);
        }
        if (fatality == 'minor') {
          subfilter.push(['>', 'MINORINJURIES_PEDESTRIAN', 0]);
          subfilter.push(['>', 'MINORINJURIES_BICYCLIST', 0]);
        }
      }
      if (subfilter.length > 1) {
        filter.push(subfilter);
      }
      if (filter.length == 1) {
        filter = ['==', 'not_defined', 1];
      }

      // if exists, just update the layer
      if (mapObj.getLayer(key)) {
        console.log('update');
        mapObj.setFilter(String(key), filter);
        mapObj.setPaintProperty(
          String(key),
          'circle-color',
          colors[index % colors.length]
        );
      }

      console.log(filter);
      if (snapshot[key] == undefined && !mapObj.getLayer(key)) {
        console.log('new layer');
        mapObj.addLayer({
          id: key,
          type: 'circle',
          source: 'route',
          paint: {
            'circle-radius': 5,
            'circle-color': colors[index % colors.length],
          },
          filter: filter,
        });
        console.log('layer added!!!');
      }
    });
    console.log('this is snapshot of filters before issue');
    console.log(snapshot);
    keys = Object.keys(snapshot);
    keys.forEach(key => {
      console.log(key);
      console.log(snapshot);
      console.log(filters);
      if (filters[key] == undefined) {
        let filter = ['==', 'not_defined', 1];
        mapObj.setFilter(String(key), filter);
      }
    });
    console.log('this is snapshot of filters');
    console.log(filters);
    setSnapshot(JSON.parse(JSON.stringify(filters)));
  }, [uu]);

  // general use effect
  useEffect(() => {
    console.log('hi');
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
