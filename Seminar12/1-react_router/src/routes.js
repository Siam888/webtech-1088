import { createBrowserRouter } from "react-router";
import Home from './components/Home';
import Tasks from './components/Tasks';
import NotFound from './components/NotFound';
import { About } from './components/Ex1-About';


// Define routes
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/tasks',
        element: <Tasks />,
    },
    {
        path: '/tasks/:id',
        element: <Tasks />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);