import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Login from "../pages/Login/Login";
import Singup from "../pages/SingUp/Singup";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../components/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUser from "../pages/Dashboard/AllUsers/AllUser";
import AdminRoutes from "./AdminRoutes";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import ManageItem from "../pages/Dashboard/ManageItem/ManageItem";
import UpdateItem from "../pages/Dashboard/ManageItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import Order from "../components/Order/Order";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path:'/',
          element: <Home/>
        },
        {
          path:'menu',
          element:<Menu/>
        },
        {
          path:'order/:category',
          element:<Order/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Singup/>
        },
        {
          path:'/secret',
          element:<PrivateRoutes><Secret/></PrivateRoutes>
        },
        {
          path:'/carts',
          element:<PrivateRoutes><Cart/></PrivateRoutes>
        }
      ]
    },
    {
      path:'/dashboard/',
      element:<PrivateRoutes><Dashboard/></PrivateRoutes>,
      children: [
        // normal user routes
        {
          path:'cart/',
          element:<PrivateRoutes><Cart/></PrivateRoutes>
        },
        {
          path:'payment/',
          element:<Payment/>
        },
        {
          path:'paymenthistory/',
          element:<PaymentHistory/>
        },
        // admin routes
        {
          path:'admin-home/',
          element:<AdminHome/>
        },
        {
          path:'users/',
          element:<AdminRoutes><AllUser/></AdminRoutes>
        },
        {
          path:'add-items/',
          element:<AdminRoutes><AddItem/></AdminRoutes>
          
        },
        {
          path:'manage-item/',
          element:<AdminRoutes><ManageItem/></AdminRoutes>
          
        }
        ,
        {
          path:'update-item/:id',
          element:<UpdateItem/>,
          loader: ({params}) => fetch(`http://localhost:5000/item/${params.id}`)
        }
      ]
    }
  ]);

  export default Routes;