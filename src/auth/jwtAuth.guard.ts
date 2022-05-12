import {
  CACHE_MANAGER,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

        let req = context.switchToHttp().getRequest();
        const body = req.body;
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        const user = this.jwtService.verify(token);
        req.user = user;
        req.body = body;

        if (token === (await this.cacheManager.get(user.Nickname + '@'))) {
          return true;
        }

        return false;
      
    } catch {
      throw new UnauthorizedException();
    }
  }
}
