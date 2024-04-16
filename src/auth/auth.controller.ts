import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../employee/dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupdto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signupdto);
  }
  @Post('/login')
  login(@Body() logindto: LogInDto): Promise<{ token: string }> {
    return this.authService.logIn(logindto);
  }
}
