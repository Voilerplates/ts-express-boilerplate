import Route from "../structs/Route";
import IndexController from '../controllers/IndexController';

class IndexRoute extends Route {
	constructor() {
		super({
			controller: new IndexController()
		});
	}
}

export default IndexRoute;