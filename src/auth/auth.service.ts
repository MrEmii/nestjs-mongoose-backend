import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/ common/interfaces/user.interface';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }


  async validateUser(username: string, password: string): Promise<IUser> {
    const user = await this.userService.findByUsername(username);

    let validPassword = await this.userService.checkPassword(password, user.password);

    if (user && validPassword) return user;

    return null;
  }

  async signIn(user: IUser): Promise<any> {
    let payload = {
      username: user.username,
      sub: user._id
    }

    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(user: UserDTO): Promise<IUser> {
    return this.userService.create(user);
  }

}
