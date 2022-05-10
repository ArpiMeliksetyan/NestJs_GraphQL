import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
    imports: [EmployeeModule, ProjectModule,GraphQLModule.forRoot(
        {
            autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql')
        }
    ),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: 'employee',
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),],
    controllers: [],
    providers: [],
})
export class AppModule {}
