import { Request, Response } from "express";
import Controller from "../structs/Controller";

export default class IndexController extends Controller {
	constructor() {
		super();
		this.loadControllerMapping([
			{ path: '/', method: 'post', fn: this.postIndex },
			{ path: '/', fn: this.getIndex }
		]);
	}

	getIndex(req: Request, res: Response): any {
		res.json({ method: "get" });
	}

	postIndex(req: Request, res: Response): any {
		res.json({ method: "post" });
	}
}