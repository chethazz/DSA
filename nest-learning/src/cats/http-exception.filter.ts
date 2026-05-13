import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch(HttpException) decorator binds the required metadata to the exception filter,
// telling Nest that this particular filter is looking for exceptions of type HttpException and nothing else.
// The @Catch() decorator may take a single parameter, or a comma-separated list
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// All exception filters should implement the generic ExceptionFilter<T> interface.
// This requires you to provide the catch(exception: T, host: ArgumentsHost) method with its indicated signature.
// T indicates the type of the exception
