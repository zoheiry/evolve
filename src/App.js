import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AlertContainer from './containers/AlertContainer';

import Main from './pages/Main';
import Home from './pages/Home';
import NewActivity from './pages/NewActivity';
import EditActivity from './pages/EditActivity';
import Schedule from './pages/Schedule';
import Activities from './pages/Activities';
import Activity from './pages/Activity';
import ActivityTracker from './pages/ActivityTracker';
import Sessions from './pages/Sessions';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Navbar from './components/Navbar';

import theme from './constants/Theme';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Navbar />
            <AlertContainer />
            <Route path="/" component={Main} />
            <Route exact path="/" component={Home} />
            <Route exact path="/intro" component={Intro} />
            <Route exact path="/activity/new" component={NewActivity} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/activity/:id" component={Activity} />
            <Route exact path="/activity/:id/edit" component={EditActivity} />
            <Route exact path="/activity/:id/track" component={ActivityTracker} />
            <Route exact path="/activity/:id/sessions" component={Sessions} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
