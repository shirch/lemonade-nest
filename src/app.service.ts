import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateEntityDto } from './entity/create.entity.dto';
import { Entity } from './entity/entity.interface';

@Injectable()
export class AppService {
  private readonly entities: Entity[] = [];

  create(entity: CreateEntityDto): Entity {
    const newEntity: Entity = { ...entity, id: uuidv4() };
    this.entities.push(newEntity);
    return newEntity;
  }
}
