import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entity/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Project {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Field()
  @Column()
  name: string

  /** As GraphQL doesn't have number type we should manually mention what the exact return type, in this case its number means Int*/
  @Field(() => Int)
  @Column()
  code: number

  @OneToMany(() => Employee, employee => employee.project)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[]

}
