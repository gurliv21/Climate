import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@mantine/core/styles.css';
import './index.css';
import { MantineProvider } from '@mantine/core';


import HomePage from "./HomePage";
import Climate from "./Climate";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/Climate',
    element: <Climate/>,
  }
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}




export default App
