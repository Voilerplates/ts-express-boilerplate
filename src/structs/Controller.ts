import { Router } from "express";
import Logger from "../utils/Logger";

class Controller {

	controllerMapping?: IControllerMappingRecord[];

	loadControllerMapping(controllerMapping: any) {
		this.controllerMapping = controllerMapping;
	}

	setUpController(router: Router) {
		for(let record of this.controllerMapping) {
			const { path, method, fn } = record;
			Logger.info(`Loading ${path} with HTTP method: ${method || 'get'}`);
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