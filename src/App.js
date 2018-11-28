import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Main}>
          <div className="App"></div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
