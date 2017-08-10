import React, {Component} from 'react';
import {Link} from 'react-router';
import Layout from './Layout';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout title="Home">
        <div style={{
          opacity: .5,
          objectPosition: '400px 50px'
        }}
        className="logoDiv">
        <img src='/images/nebulis-logo.png' height='40%' alt='nebulis-logo' />
        </div>
      </Layout>);
  }
}
