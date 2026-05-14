import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

// ArgumentMetadata has
// type: 'body' | 'query' | 'param' | 'custom' 	Indicates whether the argument is a body @Body(), query @Query(),
//  param @Param(), or a custom parameter (read more here).

// metatype?: Type<unknown> Provides the metatype of the argument, for example, String. Note: the value is undefined if you
// either omit a type declaration in the route handler method signature, or use vanilla JavaScript.

// data?: string; eg: @Body('string')The string passed to the decorator, for example @Body('string'). It's undefined if you
// leave the decorator parenthesis empty.

// Typescript interfaces disappear during transiplation, Thus if a method parameter's type is declared as an interface
// instead of a class, the metatype value will be Object

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}

// ValidationPipe class
@Injectable()
export class ValidationPipeClass implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transforms our plain JavaScript argument object into a typed object so that we can apply validation
    // Bc the incoming post body object, when deserialized from the network request, does not have any type information
    const object = plainToInstance(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  // Responsible for bypassing the validation step when the current argument being processed is
  // a native JavaScript type (these can't have validation decorators attached, so there's no reason
  // to run them through the validation step).
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
