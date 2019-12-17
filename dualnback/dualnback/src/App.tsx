import React, { useEffect } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider, useSelector } from 'react-redux';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <div >
              <div >
                <AppNavbar></AppNavbar>
              </div>

            </div>
          </Router>
        </Provider>
      </div>
    );
  };
}

export default App;
