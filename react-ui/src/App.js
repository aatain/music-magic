import React, { Component } from 'react';
import './App.css';
import { Grid, PageHeader } from 'react-bootstrap';
import Wrapper from './containers/MainContainer.jsx';

class App extends Component {
  render() {
    return (
      <div id="App">
      <PageHeader id='header' className='invert-colors padding'>

            <p>Music Magic</p>

          </PageHeader>
        <Grid fluid id='grid'>     
          <Wrapper />
        </Grid>
      </div>
    );
  }
}

export default App;