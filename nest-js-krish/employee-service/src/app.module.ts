import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import {MongooseModule} from "@nestjs/mongoose";
import {MONGO_CONNECTION} from "./app.properties";
import {EmployeesService} from "./employees/service/employees.service";

@Module({
  imports: [EmployeesModule, MongooseModule.forRoot(MONGO_CONNECTION)],
  providers: [EmployeesService],
})
export class AppModule {}
