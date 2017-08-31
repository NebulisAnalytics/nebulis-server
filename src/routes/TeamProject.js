import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';


export default class TeamProject extends Component {
  render() {
    return (
      <Layout title="Code Mon">
        <img src="/images/time-spent.png" width="50%" />
        <img src="/images/es-lint.png" width="50%" />
        <img src="/images/nebulis-code-editor.png" width="100%" />
      </Layout>
    )
  }
}
