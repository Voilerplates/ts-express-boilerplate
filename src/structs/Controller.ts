import { Router } from "express";

class Controller {

	controllerMapping?: IControllerMappingRecord[];

	loadControllerMapping(controllerMapping: any) {
		this.controllerMapping = controllerMapping;
	}

	setUpController(router: Router) {
		for(let record of this.controllerMapping) {
			const { path, method, fn } = record;
			if(method?.toLowerCase() === "post") {
				router.post(path, fn);
				continue;
			}
			router.get(path, fn);
		}
	}
	
}

export interface IControllerMappingRecord {
	path: string;
	method?: "get" | "post",
	fn: any
}

export default Controller;