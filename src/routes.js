import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HomePage from './features/home';
import ProductDetails from './features/product/pages/ProductDetails';
import Category from './features/category';
import Cart from "./features/cart";
import Address from './features/address';
import Order from "./features/order";
import OrderSuccess from './features/order/pages/OrderSuccess';
import SearchResult from './features/search';

const routes = [
  {
    key: uuidv4(),
    path: "/",
    element: <HomePage />,
  },
  {
    key: uuidv4(),
    path: `/product/:productId`,
    element:  <ProductDetails />,
  },
  {
    key: uuidv4(),
    path: `/category/:categoryId`,
    element:  <Category />,
  },
  {
    key: uuidv4(),
    path: "/cart",
    element: <Cart />
  },
  {
    key: uuidv4(),
    path: "/address",
    element: <Address />
  },
  {
    key: uuidv4(),
    path: "/order",
    element: <Order />
  },
  {
    key: uuidv4(),
    path: "/order-success",
    element: <OrderSuccess />
  },
  {
    key: uuidv4(),
    path: `/product`,
    component: SearchResult,
  },
];

const mappedRoutes = routes.map(({ path, element, key}) => (
  <Route exact path={path} element={element} key={key} />
));

export default mappedRoutes;
