import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthBodyDto } from 'src/models/auth.models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService : UsersService, private readonly jwtService : JwtService){}
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

        return this.authentificateUser({userId : existingUser.id_user})
        
    }

    async getProfile(name: string){
        const user = await this.usersService.getUser(name)
        if(!user){
            throw new NotFoundException('Utilisateur non trouvé')

        }
        return {userName : user.name, userId  : user.id_user}
    }

    // méthode pour vérifier un mot de passe 
    private async isPasswordValid(password: string , hashedPassword: string): Promise<boolean>{
        return await compare(password,hashedPassword )
    }

    // méthode pour gérer le JWT
    private async authentificateUser({userId} : {userId: string}) {
        const payload = {userId}
        return { access_token : await this.jwtService.sign(payload)}
    }
}
