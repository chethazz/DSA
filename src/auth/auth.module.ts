import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController, PassportAuthController],
  // LocalStrategy in provider so that PassportLocalGuard can use it
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'sample',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
