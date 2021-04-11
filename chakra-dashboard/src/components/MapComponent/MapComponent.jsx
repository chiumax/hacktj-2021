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

  const colors = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];

  const heatmap_colors = [
    [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      '#264653',
      0.4,
      '#2D5261',
      0.6,
      '#67BEE0',
      0.8,
      '#6DC9ED',
      1,
      '#5BA8C7',
    ],
    [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      '#2A9D8F',
      0.4,
      '#1A6159',
      0.6,
      '#3DE0CD',
      0.8,
      '#40EDD9',
      1,
      '#36C7B6',
    ],
    [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      '#E9C46A',
      0.4,
      '#61522C',
      0.6,
      '#E0BD65',
      0.8,
      '#EDC86B',
      1,
      '#C7A85A',
    ],
    [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      '#F4A261',
      0.4,
      '#614127',
      0.6,
      '#E0965A',
      0.8,
      '#ED9F5F',
      1,
      '#C78550',
    ],
    [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      '#E76F51',
      0.4,
      '#612F22',
      0.6,
      '#E06C4F',
      0.8,
      '#ED7253',
      1,
      '#C75F46',
    ],
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

        mapObj.setFilter(String(key) + 'h', filter);
        mapObj.setPaintProperty(
          String(key) + 'h',
          'heatmap-color',
          heatmap_colors[index % colors.length]
        );
        // mapObj.setPaintProperty(
        //   String(key) + 'h',
        //   'circle-color',
        //   colors[index % colors.length]
        // );
      }

      console.log(filter);
      if (snapshot[key] == undefined && !mapObj.getLayer(key)) {
        console.log('new layer');
        mapObj.addLayer({
          id: key,
          type: 'circle',
          source: 'route',
          minzoom: 15,
          paint: {
            'circle-radius': 5,
            'circle-color': colors[index % colors.length],
          },
          filter: filter,
        });

        mapObj.addLayer({
          id: key + 'h',
          type: 'heatmap',
          source: 'route',
          maxzoom: 16,
          filter: filter,
          paint: {
            'heatmap-weight': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1],
              ],
            },
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3],
              ],
            },
            'heatmap-color': heatmap_colors[index % colors.length],
            'heatmap-radius': {
              stops: [
                [11, 15],
                [15, 20],
              ],
            },
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0],
              ],
            },
          },
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
        mapObj.setFilter(String(key) + 'h', filter);
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
        data: './fiveyearcrashes.geojson',
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
