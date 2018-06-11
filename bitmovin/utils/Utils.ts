class Utils {
  public isNoEmptyString(value) {
    return typeof value === 'string' && value.length > 0;
  }
}

const utils = new Utils();

export default utils;
