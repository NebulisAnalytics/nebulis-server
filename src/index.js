// import ReactDOM from 'react-dom';
import React, {Component} from 'react';

// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import hotRenderer from './hotrenderer';

const appPath = './components/App';
const appElm = document.getElementById('app');
import App from './components/App';
hotRenderer(appPath, appElm, App);
