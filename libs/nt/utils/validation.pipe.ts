import { Injectable, ArgumentMetadata, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { isEmpty as ldIsEmpty } from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && ldIsEmpty(value)) {
      throw new HttpException('Validation failed: empty request body', HttpStatus.BAD_REQUEST);
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if ((errors || []).length) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const validTypes = [String, Boolean, Number, Array, Object];
    return !!!validTypes.find(type => metatype === type);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map(err => {
        for (const prop of Object.keys(err.constraints)) {
          return err.constraints[prop];
        }
      })
      .join(', ');
  }
}
