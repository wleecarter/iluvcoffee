import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Flavor } from './flavor.entity';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable() // Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    () => Flavor,
    (flavor) => flavor.coffees, // what is "coffee" within the Flavor Entity
    {
      cascade: true,
    },
  )
  flavors: Flavor[];
}
