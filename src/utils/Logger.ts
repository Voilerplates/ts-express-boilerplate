/**
 * Logger Utility
 * written by jabo-bernardo<hello.jabo.bernardo@gmail.com>
 */

import chalk from "chalk";
import moment from "moment";

const timestampFormat = "YYYY/MM/DD - HH:mmA";

class Logger {

	static log(...messages: any): void {
		const timestamp: number = Date.now();
		const timestampString: string = moment(timestamp).format(timestampFormat);
		for(const message of messages) {
			console.log(chalk.blue(`[LOG][${timestampString}] :: ${message}`));
		}
	}

	static error(...messages: any): void {
		const timestamp: number = Date.now();
		const timestampString: string = moment(timestamp).format(timestampFormat);
		for(const message of messages) {
			console.error(chalk.red(`[ERR][${timestampString}] :: ${message}`));
		}
	}

	static info(...messages: any): void {
		const timestamp: number = Date.now();
		const timestampString: string = moment(timestamp).format(timestampFormat);
		for(const message of messages) {
			console.info(chalk.yellow(`[INF][${timestampString}] :: ${message}`));
		}
	}

}

export default Logger;