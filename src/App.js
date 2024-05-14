import React from 'react';
import 'react-native-gesture-handler';

// ** Third Party Packages
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'styled-components';

// ** Store
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// ** Custom Components
import MainStack from './navigation';
import {theme} from './@core/infrustructure/theme';
import {persistor, store} from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <PaperProvider>
            <MainStack />
            <Toast />
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
