import { AppContainer } from 'react-hot-loader';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactDOM from 'react-dom';
import {store} from './store/configureStore'
import { Provider } from 'react-redux'


// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';


import App from './App';

injectTapEventPlugin();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#FF6A1A',
    accent1Color: '#02C5FF',
    // textColor: '#00BCD4',
  }})

const rootEl = document.getElementById('app');

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </AppContainer>
    </Provider>,
    rootEl
  );
}

if (rootEl) {
  render();
}
else {
  console.log('no rootEl');
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <MuiThemeProvider muiTheme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </AppContainer>
      </Provider>,
      rootEl
    );
  });
}
