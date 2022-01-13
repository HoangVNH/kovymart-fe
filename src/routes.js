import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HomePage from './features/home';
import ProductDetails from './features/product/pages/ProductDetails';

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
];

const mappedRoutes = routes.map(({ path, element, key}) => (
  <Route exact path={path} element={element} key={key} />
));

export default mappedRoutes;
