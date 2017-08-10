import React, {Component} from 'react';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// const themes = {
// 	darkBaseTheme: getMuiTheme(darkBaseTheme, {userAgent: 'all'}),
// 	lightBaseTheme: getMuiTheme({
// 	  palette: {
// 	    primary1Color: '#FF8442',
// 	    accent1Color: '#02C5FF',
// 	    textColor: '#00BCD4',
// 	  }}, {userAgent: 'all'})
// };
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { MenuIcon, CloseIcon } from 'mdi-material-ui';

export default class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	static propTypes = {
		title: React.PropTypes.string.isRequired
	};

	render() {
		return (
			<div id="layout">
				<AppBar
					title={ this.props.title }
					className="appbar"
					iconElementLeft={
						<IconButton onTouchTap={this.handleToggle}>
						<MenuIcon />
						</IconButton>
					}/>
				<Drawer open={this.state.open}>
					<IconButton style={styles.IconButton}><img src='/images/nebulis-logo.png' width='65%'/></IconButton>
					<IconButton style={styles.IconButton} onTouchTap={this.handleToggle}><CloseIcon /></IconButton>
					<Link to="/" style={styles.LinkItem}><MenuItem style={styles.MenuItem}>Home</MenuItem></Link>
					<Link to="/login" style={styles.LinkItem}><MenuItem style={styles.MenuItem}>Login</MenuItem></Link>
					<Link to="/projects" style={styles.LinkItem}><MenuItem style={styles.MenuItem}>Projects</MenuItem></Link>
					<Link to="/members" style={styles.LinkItem}><MenuItem style={styles.MenuItem}>Members</MenuItem></Link>
				</Drawer>
				{this.props.children}
			</div>
		);
	}
}

const styles = {
	MenuItem: {
		height: '64px',
		lineHeight: '64px',
		textAlign: 'center',
	},
	IconButton: {
		height: '64px',
		width: '100%',
		alignSelf: ''
	},
	LinkItem: {
		textDecoration: 'none'
	}
}
