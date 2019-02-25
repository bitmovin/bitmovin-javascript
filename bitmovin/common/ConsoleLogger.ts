import {Logger} from "./RestClient";

export class ConsoleLogger implements Logger {
    log(message: string, data?: any) {
        if (data != null) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }

    error(message: string, data?: any) {
        if (data != null) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }
}
