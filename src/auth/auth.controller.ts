import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@Req() req){
    return await this.authService.signIn(req.user)
  }

  @UseGuards(LocalGuard)
  @Post('signup')
  async signUp(@Body() userDTO: UserDTO){
    return await this.authService.signUp(userDTO);
  }
}
