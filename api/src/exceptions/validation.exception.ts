import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
  private _messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this._messages = response;
  }
}
