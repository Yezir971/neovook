import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getUsers(@Req() request: Request) {
    const userJwt = request['user'];
    const data = await this.usersService.getUserById(userJwt.userId);
    return data;
  }

  @Public()
  @Post('create')
  async createUser(@Body() user: User) {
    return await this.usersService.createUser(user);
  }
}
