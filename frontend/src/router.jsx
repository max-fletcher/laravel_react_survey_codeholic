import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/Surveys";
import SurveyView from "./views/SurveyView";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/dashboard',
            element: <Navigate to="/" />
         },
         {
            path: '/',
            element: <Dashboard />
         },
         {
            path: '/surveys',
            element: <Surveys />
         },
         {
            path: '/surveys/create',
            element: <SurveyView />
         },
      ]
   },
   {
      path: '/',
      element: <GuestLayout />,
      children: [
         {
            path: 'login',
            element: <Login />
         },
         {
            path: '/signup',
            element: <Signup />
         },
      ]
   },
])

export default router