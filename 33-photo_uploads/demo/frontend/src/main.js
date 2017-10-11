import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import App from './component/app';

import appStoreCreate from './lib/app-create-store.js';
let store = appStoreCreate();

let AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDom.render(<AppContainer />, document.getElementById('root'));
