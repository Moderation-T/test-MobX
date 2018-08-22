import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// import * as stores from './stores';
import {store} from './stores'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider
    stateTreeStore = {store.stateTreeStore}
><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
