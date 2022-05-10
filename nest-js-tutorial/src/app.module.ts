import {Module} from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {UserModule} from './user/user.module';
import {BookmarkModule} from './bookmark/bookmark.module';
import {PrismaModule} from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import {EmployeesService} from "../../nest-js-krish/employee-service/src/employees/service/employees.service";


@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        AuthModule,
        UserModule,
        BookmarkModule,
        PrismaModule
    ],
    providers: [EmployeesService],
})
export class AppModule {
}
