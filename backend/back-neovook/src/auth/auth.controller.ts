import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthBodyDto } from 'src/models/auth.models';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }
    @Get("login")
    async getAuth(@Body() authBody : AuthBodyDto){
        const data = await this.authService.login(authBody);
        return data
    }
}
