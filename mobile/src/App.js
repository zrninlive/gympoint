import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import createRouter from './routes';

export default function App() {
  const [logged, setLogged] = useState(false);

  async function loadSession() {
    const session = await AsyncStorage.getItem('student_id');
    setLogged(!!session);
  }

  useEffect(() => {
    loadSession();
  }, []);

  const Routes = createRouter(logged);

  return <Routes />;
}
