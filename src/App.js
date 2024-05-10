import React from 'react';
import 'react-native-gesture-handler';

// ** Third Party Packages
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'styled-components';
import {StripeProvider} from '@stripe/stripe-react-native';

// ** Store
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// ** Custom Components
import MainStack from './navigation';
import {theme as AppTheme} from './@core/infrustructure/theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={AppTheme}>
          <PaperProvider>
            <StripeProvider publishableKey={STRIPE_KEY}>
              <MainStack />
            </StripeProvider>
            <Toast />
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
