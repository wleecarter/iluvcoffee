import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Coffee } from './coffee.entity';

@Entity('flavors')
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Coffee,
    (coffee) => coffee.flavors, // what is "flavor" within the Coffee Entity
  )
  coffees: Coffee[];
}
