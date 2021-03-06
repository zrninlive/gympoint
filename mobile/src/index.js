import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import App from './App';

export default function Index() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <App />
    </>
  );
}
