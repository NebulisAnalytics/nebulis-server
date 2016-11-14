import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

export default function hotRenderer(appPath, appElm, App) {
	function render() {
		ReactDOM.render(
			<AppContainer>
				<App />
			</AppContainer>,
			appElm
		);
	}

	function hotRender() {
		const NextApp = require(appPath).default;
		ReactDOM.render(
			<AppContainer>
				<NextApp />
			</AppContainer>,
			appElm
		);
	}

	render();

	if (module.hot) {
		module.hot.accept(appPath, () => {
			ReactDOM.unmountComponentAtNode(appElm);
			setTimeout(hotRender, 1000);
		});
	}
}

