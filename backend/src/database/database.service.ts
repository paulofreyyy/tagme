import { Injectable } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

@Injectable()
export class DatabaseService{
    private mongoServer: MongoMemoryServer;

    async onModuleInit(){
        this.mongoServer = await MongoMemoryServer.create();
        const uri = this.mongoServer.getUri();
        await MongooseModule.forRoot(uri);
    }

    async onModuleDestroy(){
        await this.mongoServer.stop()
    }
}