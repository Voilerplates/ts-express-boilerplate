import express, { Application } from "express";
import fs from "fs";
import path from "path";

// Utilities
import Logger from "../utils/Logger";

// Middlewares
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

class Server implements IServer {

	port: number;
	routesPath: string;
	app: Application;

	constructor(opt?: IServerOptions) {
		this.port = opt?.port || 3000;
		this.app = opt?.app || express();
		this.routesPath = opt?.routesPath || path.join(__dirname, "../routes");
	}

	_loadRoutes = async (): Promise<void> => {

		// Dynamically loads all of the routes
		const routeFiles: string[] = fs.readdirSync(this.routesPath).filter(file => file.endsWith(".js"));
		for(let route of routeFiles) {
			let Router = (await import(`${this.routesPath}\\${route}`)).default;
			Router = new Router();
			let pathName: string = Router.routeName || route.replace(".js", "");
			if(pathName.toLowerCase() === 'index') pathName = '';
			if(!Router || typeof Router !== "object") {
				Logger.error(`Ignoring ${`${this.routesPath}\\${route}`}, Invalid route.`);
				continue;
			}
			this.app.use(`/${pathName}`, Router.router);
			Logger.info(`Successfully loaded /${pathName}`);
		}
	}

	_loadMiddlewares(): void {

		// Load your middlewares here
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(morgan("dev"));
		this.app.use(helmet());
		this.app.use(cors());

		Logger.log(`Successfully loaded middlewares!`);
	}

	start(): void {
		this.app.listen(this.port, () => {
			Logger.log(`Server ignited at port ${this.port}`);
			Logger.log("Loading up middlewares...");
			this._loadMiddlewares();
			Logger.log("Dynamically loading routes...");
			this._loadRoutes();
		});
	}

}

export interface IServer {
	port: number;
	routesPath: string;
	app: Application;
	start(): void;
	_loadMiddlewares(): void;
	_loadRoutes(): void;
}

export interface IServerOptions {
	port?: number;
	routesPath?: string;
	app?: Application;
}

export default Server;