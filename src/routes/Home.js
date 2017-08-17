import React, { Component } from 'react';
import { Link } from 'react-router';
import Layout from './Layout';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      logoContainer: {
        opacity: 0.15,
        paddingTop: '100',
        margin: '0 auto',
        textAlign: 'center',
        objectPosition: '400px 50px'
      },
      logo: {
        height: '50%',
        width: '50%',
      }
    }

    return (
      <Layout title="Home">
        <div style={styles.logoContainer} className="logoDiv">
          <img src="/images/nebulis-logo.png" style={styles.logo} alt="nebulis-logo" />
        </div>
      </Layout>);
  }
}
