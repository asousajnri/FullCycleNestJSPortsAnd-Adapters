import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-sequelize.gateway';
import { ListHttpGateway } from './gateways/list-http.gateway';
// import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { PublishListCreatedListener } from './listeners/publish-listener-created.listener';
import { CreateListInCrmJob } from './jobs/create-list-in-crm.job';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:3005',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 1 },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListHttpGateway,
    // CreateListInCrmListener,
    PublishListCreatedListener,
    CreateListInCrmJob,
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListHttpGateway,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
