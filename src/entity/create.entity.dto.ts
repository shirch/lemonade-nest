import { Entity } from './entity.interface';

export type CreateEntityDto = Omit<Entity, 'id'>;
