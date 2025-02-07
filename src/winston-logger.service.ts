import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const esTransportOpts = {
      level: 'info',
      clientOpts: { node: 'http://elasticsearch:9200' },
      indexPrefix: 'test_gac-logs',
    };

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new ElasticsearchTransport(esTransportOpts),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}


export const logger = new WinstonLogger()
