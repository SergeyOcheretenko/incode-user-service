export class ConflictException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictException';
  }
}
