import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      port: 3306,
      username:"root",
      password:"",
      database:"typeorm-mysql",
      entities:[User,Profile],
      synchronize:true,
      autoLoadEntities: true
    }),
    UsersModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
