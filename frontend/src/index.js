import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/main/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // ErrorElement: <Error />, // create custom error component and change it
    children: [
      {
        index: true,
        element: <Home />
      },
      // {
      //   path: "/about",
      //   element: <AboutPage />
      // },
    ]
  },
  // {
  //   path: "/donor",
  //   element: <App />,
  //   ErrorElement: <Error />, // create custom error component and change it
  //   Children: []
  // },
  // {
  //   path: "/recipient",
  //   element: <App />,
  //   ErrorElement: <Error />, // create custom error component and change it
  //   Children: [
  //     {
  //       index: true,
  //       element: <Home />
  //     },
  //     {
  //       path: "/login",
  //       element: <AboutPage />
  //     },
  //   ]
  // }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  <RouterProvider router={router} />
  // </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
