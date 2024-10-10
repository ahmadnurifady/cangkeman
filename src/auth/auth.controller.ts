import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto.model';
import { Public } from 'src/utils/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() req: CreateUserDto) {
    const result = await this.authService.RegisterUser(req);

    return result;
  }
}
