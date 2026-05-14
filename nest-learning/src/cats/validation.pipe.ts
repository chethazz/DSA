import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

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
