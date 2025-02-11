import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../winston-logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method,
        url: originalUrl,
        status: res.statusCode,
        responseTime: `${duration}ms`,
        timestamp: new Date().toISOString(),
      };

      logger.log(JSON.stringify(logData));
    });

    next();
  }
}
