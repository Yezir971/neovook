import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthBodyDto } from 'src/models/auth.models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService : UsersService){}
    async login(authBody : AuthBodyDto){
        const {email ,password} = authBody
        const existingUser = await this.usersService.getUserByEmail(email)
        if (!existingUser) {
            throw new NotFoundException({error: "Mot de passe ou nom d'utilisateur incorrect",});
        }

        const isPasswordValid = await this.isPasswordValid(password, existingUser.password);

        if (!isPasswordValid) {
            throw new NotFoundException({error: "Mot de passe ou nom d'utilisateur incorrect",});
        }  

        return{userId : existingUser.id_user, userName: existingUser.name, avatar: existingUser.avatar, email: existingUser.email}
        
    }

    // fonction pour vérifier un mot de passe 
    private async isPasswordValid(password: string , hashedPassword: string): Promise<boolean>{
        return await compare(password,hashedPassword )
    }
}
