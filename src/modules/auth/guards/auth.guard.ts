import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    const publicRoutes = ['/auth/signup', '/auth/login', '/doc', '/'];
    if (publicRoutes.includes(req.url)) return true;

    if (!authHeader)
      throw new UnauthorizedException('Authorization header missing');

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid authorization header format');

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      req.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
