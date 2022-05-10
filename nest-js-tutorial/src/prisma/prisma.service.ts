import {Injectable} from '@nestjs/common';
import {PrismaClient} from '@prisma/client'
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });
    }

    cleanDb() {
        /* via transaction we will be sure that first will be done bookmark deletion then user deletion**/
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ]);


    }
}
