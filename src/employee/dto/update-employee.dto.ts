import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './signup.dto';

export class UpdateEmployeeDto extends PartialType(SignUpDto) {}
