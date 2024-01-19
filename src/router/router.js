import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Error404 from "../pages/error/Error404";
import ErrorBoundary from '../pages/error/ErrorBoundary';
import HomePage from "../pages/home/HomePage";
import SignInPage from "../pages/signin/SignInPage";
import SignupPage from "../pages/signup/SignupPage";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Error404 />,
        errorElement: <ErrorBoundary />,

    },
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: 'account/signin/*',
        element: <SignInPage />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: 'account/signup/*',
        element: <SignupPage />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/apps/dashboard',
        element: <Dashboard />,
        errorElement: <ErrorBoundary />,
    }
]);

export default router;