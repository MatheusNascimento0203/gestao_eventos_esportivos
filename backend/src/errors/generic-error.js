export default class GenericError {
  constructor(status, message) {
    (this.status = status), (this.message = message);
  }
}
