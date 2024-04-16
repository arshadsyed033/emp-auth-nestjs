import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from 'src/employee/Schema/employee';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../employee/dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, username, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await this.employeeModel.create({
      name,
      username,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: employee._id });
    return { token };
  }

  async logIn(loginDto: LogInDto): Promise<{ token: string }> {
    const { username, password } = loginDto;
    const employee = await this.employeeModel.findOne({ username });
    if (!employee) {
      throw new UnauthorizedException('Invalid username ');
    }

    const isPasswordMatched = await bcrypt.compare(password, employee.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid  password');
    }
    const token = this.jwtService.sign({ id: employee._id });
    return { token };
  }
}
