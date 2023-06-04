import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/UpdateUser.dto';
import { User } from 'src/entities/User.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  findusers = async (): Promise<User[]> => {
    try {
      return this.userRepository.find({
        relations: {
            profile: true,
        },
    });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
  createUser = async (createUserDto: CreateUserDto): Promise<any> => {
    try {
      const dtoToEntity = plainToClass(User,createUserDto);
      const createUser = this.userRepository.create(dtoToEntity);
      const user =  await this.userRepository.save(
        createUser
      );
      const profile = await this.profileRepository.save(
        this.profileRepository.create(plainToClass(Profile,createUserDto.profile))
      );
      user.profile = profile
      this.userRepository.save(user)
      return user
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Username is already exists');
      } else {
        console.log(error.message)
        throw new InternalServerErrorException();
      }
    }
  };

  updateUser = async (
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> => {
    try {
      return await this.userRepository.update({ id }, { ...updateUserDto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };

  deleteUser = async (id: number): Promise<any> => {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id= :id', { id: id })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
}
