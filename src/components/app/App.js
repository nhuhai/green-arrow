import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from '../../reducers';
import ItemsIndex from '../../containers/items-index/items-index';
import ItemsNew from '../../containers/items-new/items-new';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider className="app" store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>
            <Route path='/items/new' component={ItemsNew} />
            <Route path='/items' component={ItemsIndex} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
