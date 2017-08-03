import React, {Component} from 'react';
import nebulisActions from './../actions/nebulisActions';

export default class Login extends Component {
	render() {
		return (<div className="loginButton"><a href="/github"><button>Login with GitHub!</button></a></div>);
	}

  loginFunc() {
    nebulisActions.login(null);
  }
}
