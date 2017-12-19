class Utils {
  isNoEmptyString(value) {
    return typeof value === 'string' && value.length > 0;
  }
}

const utils = new Utils();

export default utils;
