import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SingUpPage from './pages/SingUpPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/signup",
    element: <SingUpPage/>,
  },
]);
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App