import { Controller, Get, Param, Query, UseGuards, SetMetadata } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

import { Public } from './auth/decorators/public.decorators';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  @SetMetadata('isPublic', true)
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('/tasks/')
  tasks() {
    return this.appService.getTasks();
  }
}
