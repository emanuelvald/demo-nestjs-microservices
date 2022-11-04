import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ProxyQueuesEnum } from './proxy.enum';

@Injectable()
export class ProxyService {
  constructor(private readonly configService: ConfigService) {}

  clientProxyProduct(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.configService.get('AMQP_URL'),
        queue: ProxyQueuesEnum.PRODUCT_QUEUE,
      },
    });
  }
}
