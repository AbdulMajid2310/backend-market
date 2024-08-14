import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: User) {
    const existingUser = await this.userService.findOne(createUserDto.email);
    if (existingUser) {
      throw new HttpException(
        `email ${createUserDto.email} sudah ada`,
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(String(username));
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUserDto: User) {
    return this.userService.update(String(username), updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.remove(String(username));
  }
}
