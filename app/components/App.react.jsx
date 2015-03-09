// import './App.scss';

import React from 'react';

let App = React.createClass({
  getInitialState() {
    return {
      count: 0
    }
  },

  handleClick() {
    this.setState({count: this.state.count+1});
  },

  render() {
    return (
      <h1 onClick={this.handleClick}>Hi! {this.state.count}</h1>
    );
  }

});

export default App;
