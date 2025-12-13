import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from './../services/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const startTime = Date.now();
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;

        const message =
          `[${new Date().toISOString()}] ` +
          `Incoming url: ${req.method} ${req.url} | query: ${JSON.stringify(
            req.query,
          )} | body: ${JSON.stringify(req.body)} | status: ${res.statusCode} ` +
          ` ${duration}ms\n`;

        this.loggerService.log(message);
      }),
    );
  }
}
