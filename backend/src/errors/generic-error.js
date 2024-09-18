export default class GenericError {
  constructor(status, mensage) {
    (this.status = status), (this.mensage = mensage);
  }
}
