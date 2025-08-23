import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthBodyDto } from 'src/models/auth.models';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/decorators/public.decorato';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }
    @Public()
    @Post("login")
    async getAuth(@Body() authBody : AuthBodyDto){
        const data = await this.authService.login(authBody);
        return data
    }

    @Get('profils')
    async getprofile(@Request() req){
        return this.authService.getProfile(req.user.userName)
    }
}
