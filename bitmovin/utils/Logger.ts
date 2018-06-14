class Logger {
  public logging: boolean;

  constructor(logging) {
    this.setLogging(logging);
  }

  public setLogging(logging) {
    this.logging = logging;
  }

  public enableLogging() {
    this.setLogging(true);
  }

  public disableLogging() {
    this.setLogging(false);
  }

  public log(message) {
    if (!this.logging) {
      return;
    }

    // tslint:disable-next-line
    console.log(message);
  }

  public error(message) {
    if (!this.logging) {
      return;
    }
    // tslint:disable-next-line
    console.error(message);
  }
}

const logger = new Logger(false);

export default logger;
