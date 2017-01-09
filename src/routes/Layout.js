import React, {Component} from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const themes = {
	darkBaseTheme: getMuiTheme(darkBaseTheme, {userAgent: 'all'})
};
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static propTypes = {
		title: React.PropTypes.string.isRequired
	};

	render() {
		return (
			<MuiThemeProvider muiTheme={themes['darkBaseTheme']}>
				<div id="layout">
					<AppBar title={ this.props.title } className="appbar"/>
					{this.props.children}
				</div>
			</MuiThemeProvider>);
	}
}
