export default class BitmovinError extends Error {
  private response: any;

  constructor(message, response) {
    super(message);
    this.response = response;
  }
}
