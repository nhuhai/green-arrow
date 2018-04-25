import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from '../../reducers';
import ItemsIndex from '../../containers/items-index/items-index';
import ItemsNew from '../../containers/items-new/items-new';
import ItemDetail from '../../containers/item-detail/item-detail';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider className="app" store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/items/new' component={ItemsNew} />
              <Route path='/items/:id' component={ItemDetail} />
              <Route path='/items' component={ItemsIndex} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
