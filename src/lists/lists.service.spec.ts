import { ListsService } from './lists.service';
import { ListInMemoryGateway } from './gateways/list-in-memory.gateway';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListInMemoryGateway;
  let listIntegrationGateway: ListInMemoryGateway;

  beforeEach(() => {
    listPersistenceGateway = new ListInMemoryGateway();
    listIntegrationGateway = new ListInMemoryGateway();
    service = new ListsService(listPersistenceGateway, listIntegrationGateway);
  });

  it('should create a list', async () => {
    const list = await service.create({ name: 'My List' });
    expect(listPersistenceGateway.items).toEqual([list]);
    expect(listIntegrationGateway.items).toEqual([list]);
  });
});
