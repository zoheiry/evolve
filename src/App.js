import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main';
import NewActivity from './pages/NewActivity';
import Schedule from './pages/Schedule';
import Activities from './pages/Activities';
import theme from './constants/Theme';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Route path="/" component={Main} />
            <Route exact path="/activity/new" component={NewActivity} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/activities" component={Activities} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
