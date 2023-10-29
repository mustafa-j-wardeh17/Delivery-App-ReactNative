import { StatusBar } from 'expo-status-bar';

import Navigation from './src/Navigation/Navigation';
import { store } from './src/Redux/store'
import { Provider } from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar
        barStyle="dark-content"
        style='dark'
      />
    </Provider>
  );
}

