import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import * as stores from './stores';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
