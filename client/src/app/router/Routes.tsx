import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import Register from "../../features/account/Register";
import Orders from "../../features/order/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";
import AboutPage from "../../features/about/AboutPage";
import AllOrders from "../../features/admin/AllOrders";
import BrandInventory from "../../features/admin/BrandInventory";
import ProductTypeInventory from "../../features/admin/ProductTypeInventory";
import SizeInventory from "../../features/admin/SizeInventory";
import ProductSizeInventory from "../../features/admin/ProductSizeInventory";
import ProfilePage from "../../features/account/ProfilePage";
import ContactPage from "../../features/contact/ContactPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutWrapper />},
                {path: 'orders', element: <Orders />},
                {path: 'profile', element: <ProfilePage />}
            ]},
            {element: <RequireAuth roles={['Admin']} />, children: [
                {path: 'inventory', element: <Inventory />},
                {path: 'allOrders', element: <AllOrders />},
                {path: 'brandInventory', element: <BrandInventory />},
                {path: 'productTypeInventory', element: <ProductTypeInventory />},
                {path: 'sizeInventory', element: <SizeInventory />},
                {path: 'productTypeInventory', element: <ProductTypeInventory />},
                {path: 'productSizeInventory', element: <ProductSizeInventory />}
            ]},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:productId', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])