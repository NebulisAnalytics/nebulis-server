import React, {Component} from 'react';
import nebulisActions from './../actions/nebulisActions';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
}

export default class Login extends Component {
	render() {
		return (<div className="loginButton">
			<a href="/github">
				<RaisedButton
		      href="https://github.com/callemall/material-ui"
		      target="_blank"
		      label="Login with Github"
		      primary={true}
		      style={styles.button}
		      icon={<FontIcon className="muidocs-icon-custom-github"/>}
				/>
			</a>
	</div>);
	}

  loginFunc() {
    nebulisActions.login(null);
  }
}
