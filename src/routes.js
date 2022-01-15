import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HomePage from './features/home';
import ProductDetails from './features/product/pages/ProductDetails';
import Category from './features/category';

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
];

const mappedRoutes = routes.map(({ path, element, key}) => (
  <Route exact path={path} element={element} key={key} />
));

export default mappedRoutes;
