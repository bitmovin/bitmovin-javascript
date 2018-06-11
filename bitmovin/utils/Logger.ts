class Logger {
  logging: boolean;

  constructor(logging) {
    this.setLogging(logging);
  }

  setLogging(logging) {
    this.logging = logging;
  }

  enableLogging() {
    this.setLogging(true);
  }

  disableLogging() {
    this.setLogging(false);
  }

  log(message) {
    if (!this.logging) {
      return;
    }

    console.log(message);
  }

  error(message) {
    if (!this.logging) {
      return;
    }

    console.error(message);
  }
}

const logger = new Logger(false);

export default logger;
