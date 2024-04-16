import { SignUpDto } from './dto/signup.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './Schema/employee';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}
  create(createEmployeeDto: SignUpDto): Promise<Employee> {
    const model = new this.employeeModel();
    model.name = createEmployeeDto.name;
    model.username = createEmployeeDto.username;
    model.password = createEmployeeDto.password;
    return model.save();
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  findOne(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel
      .updateOne(
        { _id: id },
        {
          name: updateEmployeeDto.name,
          username: updateEmployeeDto.username,
          password: updateEmployeeDto.password,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.employeeModel.deleteOne({ _id: id }).exec();
  }
}
