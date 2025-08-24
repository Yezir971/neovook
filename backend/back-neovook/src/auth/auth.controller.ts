import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthBodyDto } from 'src/models/auth.models';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly jwtService : JwtService){

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

    @Get('verify')
    async verifyToken(@Req() request: Request) {
        const userJwt = request['user']
        if(userJwt){
            return {
                success: true,
                message: 'Token valide',
            };

        }
        return {
            success: false,
            message: 'Token non valide',
        };

    }
}
