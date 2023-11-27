import { ListsService } from './lists.service';
import { ListInMemoryGateway } from './gateways/list-in-memory.gateway';
import { of } from 'rxjs';

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('ListsService', () => {
  let service: ListsService;
  let listGateway: ListInMemoryGateway;

  beforeEach(() => {
    listGateway = new ListInMemoryGateway();
    service = new ListsService(listGateway, mockHttpService as any);
  });

  it('should create a list', async () => {
    const list = await service.create({ name: 'My List' });
    expect(listGateway.items).toEqual([list]);
  });
  // let service: ListsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
