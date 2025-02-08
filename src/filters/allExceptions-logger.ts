import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { WinstonLogger } from '../winston-logger.service'; 

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new WinstonLogger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

        const logArray = [
            `method: ${request.method}`,
            `path: ${request.url}`,
            `status: ${status}`,
            `timestamp: ${new Date().toISOString()}`,
            `stack: ${exception instanceof Error ? exception.stack : 'undefined'}`
          ];
        const string = logArray.join(', ');

        this.logger.error(`Exception caught: ${typeof message === 'string' ? message : JSON.stringify(message)}`, string);

    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'string' ? message : (message as any).message || 'Internal server error',
    });
  }
}
