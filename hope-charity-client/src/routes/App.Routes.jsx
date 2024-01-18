import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Components/pages/Home/Home";
import Login from "../Components/pages/Login/Login";
import SignUp from "../Components/pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Components/Layouts/Shared/Dashboard";
import DonateNow from "../Components/pages/DonateNow/DonateNow";
import StudentRoute from "./StudentRoute";
import UserHome from "../Components/pages/Dashboard/UserHome/UserHome";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Components/pages/Dashboard/AdminHome.jsx/AdminHome";
import AllUsers from "../Components/pages/Dashboard/AllUsers/AllUsers";
import Events from "../Components/pages/Home/Events/Events";
import Charities from "../Components/pages/Home/Charities/Charities";
import OurWork from "../Components/pages/Home/OurWork/OurWork";
import AboutUs from "../Components/pages/AboutUs/AboutUs";
import Payment from "../Components/pages/DonateNow/Payment";
import AdminPaymentHistory from "../Components/pages/Dashboard/AdminPaymentHistory/AdminPaymentHistory";
import AdminAllUsers from "../Components/pages/Dashboard/AdminAllUsers/AdminAllUsers";
import AdminAddEvent from "../Components/pages/AdminAddEvent/AdminAddEvent";
import AdminAllEvents from "../Components/pages/Dashboard/AdminAllEvents/AdminAllEvents";
import AdminUpdateEvent from "../Components/pages/Dashboard/AdminUpdateEvent/AdminUpdateEvent";
import UserPaymentHistory from "../Components/pages/Dashboard/UserPaymentHistory/UserPaymentHistory";
import UserJoinedEvents from "../Components/pages/Dashboard/UserJoinedEvents/UserJoinedEvents";
// import CheckoutForm from "../Components/pages/DonateNow/CheckoutForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "donate-now",
        element: <DonateNow />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "charities",
        element: <Charities />,
      },
      {
        path: "our-work",
        element: <OurWork />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      // {
      //   path: "checkout",
      //   element: <CheckoutForm/>,
      // },
      {
        path: "payment",
        element: <Payment/>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path:'userhome',
        element:<StudentRoute><UserHome></UserHome></StudentRoute>
      },
      {
        path:'userpaymenthistory',
        element:<StudentRoute><UserPaymentHistory></UserPaymentHistory></StudentRoute>
      },
      {
        path:'userjoinedevents',
        element:<StudentRoute><UserJoinedEvents></UserJoinedEvents></StudentRoute>
      },
      //Admin Route
      {
        path:'adminhome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'adminpaymenthistory',
        element:<AdminRoute><AdminPaymentHistory></AdminPaymentHistory></AdminRoute>
      },
      {
        path:'adminallusers',
        element:<AdminRoute><AdminAllUsers></AdminAllUsers></AdminRoute>
      },
      {
        path:'addevent',
        element:<AdminRoute><AdminAddEvent></AdminAddEvent></AdminRoute>
      },
      {
        path:'adminallevents',
        element:<AdminRoute><AdminAllEvents></AdminAllEvents></AdminRoute>
      },
      {
        path:'adminupdateevent/:id',
        element:<AdminRoute><AdminUpdateEvent></AdminUpdateEvent></AdminRoute>
      },
      {
        path: 'allusers', 
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
    ],
  },
]);
