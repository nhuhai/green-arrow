import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import './app.css';

import reducers from '../../reducers';
import ItemsIndex from '../../containers/items-index/items-index';
import ItemsNew from '../../containers/items-new/items-new';
import ItemDetail from '../../containers/item-detail/item-detail';
import Home from '../../components/home/home';
import NewTransaction from '../../containers/new-transaction/new-transaction';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div className="app">
            <Home />
            <Switch>
              <Route path='/items/new' component={ItemsNew} />
              <Route path='/items/:id' component={ItemDetail} />
              <Route path='/items' component={ItemsIndex} />
              <Route path='/new-transaction' component={NewTransaction} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
