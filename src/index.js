import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Form from './pages/Form';
import Location from './pages/Location';
import Success from './pages/Success';
import NoPage from './pages/NoPage';
import List from './pages/List';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="form-general" element={<Form />} />
          <Route path="location" element={<Location />} />
          <Route path="success" element={<Success />} />
          <Route path="list" element={<List />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
