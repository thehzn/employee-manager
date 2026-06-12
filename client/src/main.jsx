import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import  store  from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter> 
  <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
