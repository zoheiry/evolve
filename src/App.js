import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
