import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception;

    response.status(status).json({
      statusCode: status,
      message: msg.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
