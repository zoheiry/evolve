import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main';
import Home from './pages/Home';
import NewActivity from './pages/NewActivity';
import EditActivity from './pages/EditActivity';
import Schedule from './pages/Schedule';
import Activities from './pages/Activities';
import Activity from './pages/Activity';
import Navbar from './components/Navbar';
import theme from './constants/Theme';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar />
            <Route path="/" component={Main} />
            <Route exact path="/" component={Home} />
            <Route exact path="/activity/new" component={NewActivity} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/activity/:id" component={Activity} />
            <Route exact path="/activity/:id/edit" component={EditActivity} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
