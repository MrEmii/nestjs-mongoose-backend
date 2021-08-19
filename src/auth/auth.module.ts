import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'J123JOKASDHNIUWQLKRH398SAOIDHO',
      signOptions: {
        expiresIn: '12h',
        audience: 'http://localhost:3000'
      }
    })
  ]
})
export class AuthModule { }
