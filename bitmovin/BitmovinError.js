export default class BitmovinError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}
