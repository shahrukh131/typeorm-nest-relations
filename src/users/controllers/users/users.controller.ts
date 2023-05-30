import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = this.userService.findusers();
    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.createUser(createUserDto);
    return res;
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const res = await this.userService.updateUser(id, updateUserDto);
    return res;
  }


}
