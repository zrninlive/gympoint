import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'GYMPOINT APP',
      host: 'http://192.168.0.8',
    })
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
