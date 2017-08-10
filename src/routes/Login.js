import React, {Component} from 'react';
import nebulisActions from './../actions/nebulisActions';
import Layout from './Layout';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { GithubCircleIcon } from 'mdi-material-ui';

const styles = {
  button: {
    margin: 'auto',
  },
	h1: {
		padding: 'auto',
		marginTop: '47px',
		color: '#02C5FF'
	},
  paper: {
	  height: 300,
	  width: 400,
	  margin: 'auto',
		marginTop: '40px',
	  textAlign: 'center',
	  display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
}

export default class Login extends Component {
	render() {
		return (
			<Layout title="Log In">
				<Paper style={styles.paper} zDepth={2} >
					<h1 style={styles.h1}>Nebulis Analytics</h1>
					<RaisedButton
			      href="/auth/github"
			      target="_blank"
			      label="Login with Github"
			      primary={true}
			      style={styles.button}
			      icon={<GithubCircleIcon />}
					/>
				</Paper>
			</Layout>
		);
	}

  loginFunc() {
    nebulisActions.login(null);
  }
}
