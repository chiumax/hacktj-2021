import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <div>
    <ColorModeScript initialColorMode="dark" />
    <App />
  </div>,
  document.getElementById('root')
);
