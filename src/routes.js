import { Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HomePage from './features/home';

const routes = [
  {
    key: uuidv4(),
    path: "/",
    element: <HomePage />,
  },
];

const mappedRoutes = routes.map(({ path, element, key}) => (
  <Route exact path={path} element={element} key={key} />
));

export default mappedRoutes;
