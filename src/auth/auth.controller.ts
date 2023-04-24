import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.signIn(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'signin' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  async signout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'signout' };
  }
}
