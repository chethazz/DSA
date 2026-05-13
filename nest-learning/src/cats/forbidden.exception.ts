import { HttpException, HttpStatus } from '@nestjs/common';

// Custom exception
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
