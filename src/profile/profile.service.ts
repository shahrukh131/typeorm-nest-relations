import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { plainToClass } from '@nestjs/class-transformer';


@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this.userRepository.findOne({
        where:{
          id:id
        },relations:{
          profile:true
        }
      })
      const profile = user.profile
      const dtoToEntity = plainToClass(Profile,updateProfileDto);
      return await this.profileRepository.createQueryBuilder()
      .update(Profile)
      .set(dtoToEntity)
      .where("id = :id", { id: profile?.id })
      .execute()
    } catch (error) {
      // throw new InternalServerErrorException();
      console.log(error.message);
      
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
