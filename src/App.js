import React, { Component } from 'react';
import Job from './jobs/Job';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Page">
        <Job/>
        </div>
      </div>
    )
  }
}

export default App;
