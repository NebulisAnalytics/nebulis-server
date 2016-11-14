import React, {Component} from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Home'
		};
	}

	render() {
		return (
			<div id="layout">

				<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
					<AppBar title={ this.state.title }/>
				</MuiThemeProvider>

				{this.props.children}
		</div>);
	}
}

Layout.propTypes = {
	children: React.PropTypes.any
};
