import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entity/user.entity";

@Controller('api')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get("users/get")
    async getUsers(){
        const data = await this.usersService.getUsers();
        return data
    }

    @Post("user/create")
    async createUser(@Body() user: User){
        return await this.usersService.createUser(user)
    }
}
