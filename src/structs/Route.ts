/**
 * Route Structure
 * written by jabo-bernardo<hello.jabo.bernardo@gmail.com>
 */

import { Router } from "express";
import Controller from "./Controller";

class Route implements IRoute {
	
	router: Router;
	controller?: Controller;
	routeName?: string;

	constructor(opt: IRouteOptions) {
		this.router = Router();
		this.routeName = opt?.routeName;
		this.controller = opt?.controller;
		this.controller.setUpController(this.router);
	}

}

export interface IRoute {
	router: Router;
	controller?: Controller;
	routeName?: string;
}

export interface IRouteOptions {
	controller: Controller;
	routeName?: string;
}

export default Route;