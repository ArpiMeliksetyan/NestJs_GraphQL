import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './service/employees.service';
import {EmployeeRepository} from "./repository/employee.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Employee, EmployeeSchema} from "./schemas/employee.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeesService,EmployeeRepository]
})
export class EmployeesModule {}
