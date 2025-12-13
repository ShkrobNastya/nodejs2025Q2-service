import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from '../services/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.log(
      `[${new Date().toISOString()}] ` +
        `Error: ${req.method} ${req.url} | status: ${status} | error: ${exception instanceof Error ? exception.stack : exception}`,
    );

    res.status(status).json({
      statusCode: status,
      message:
        status === 500 ? 'Internal Server Error' : (exception as any).message,
    });
  }
}
