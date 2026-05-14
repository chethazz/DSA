import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

// There might be use cases when we would like to extend built in default global exception filter,
// and override the behavior based on certain factors.
// In order to delegate exception processing ot the base filter, you need to extend BaseExceptionFilter and
// call inherited catch() method.

// Method-scoped and Controller-scoped filters that extend the BaseExceptionFilter should not be instantiated with new.
// Instead, let the framework instantiate them automatically.
