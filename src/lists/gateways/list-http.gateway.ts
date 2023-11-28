import { Inject, Injectable } from '@nestjs/common';
import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-interface.gateway';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListHttpGateway implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}
  async create(list: List): Promise<List> {
    await lastValueFrom(this.httpService.post('lists', { name: list.name }));
    return list;
  }
  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get<List[]>('lists'));
    return data.map((item) => new List(item.name, item.id));
  }
  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.get<List>(`lists/${id}`),
    );
    return new List(data.name, data.id);
  }
}
