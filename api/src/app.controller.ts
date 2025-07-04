import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { monitor } from '@colyseus/monitor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.monitor();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
