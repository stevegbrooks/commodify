import React, { Component } from 'react';
import hometext from '../assets/HomeText.js';
import ReactMarkdown from 'react-markdown';

class Home extends Component {
  render() {
    return (
      <div className = "Home">
        <ReactMarkdown source={hometext} />
      </div>
    )
  }
}

export default Home