/**
 * This is an example route set up
 */

import Route from "../structs/Route";

// Import your route controller and pass it as a `controller` property on the Route class (shown below)
import IndexController from '../controllers/IndexController';

const IndexRoute = new Route({ controller: new IndexController() });

export default IndexRoute;