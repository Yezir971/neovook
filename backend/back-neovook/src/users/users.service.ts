import { Injectable } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()

export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository :Repository<User>){

    }
    async getUsers(): Promise<User[]>{
        console.log("usersService triggered");
        return await this.userRepository.find()
        
    }
    async createUser(user : User) : Promise<String>{
        try {
            const newUser = this.userRepository.create(user); 
            await this.userRepository.save(newUser);
            return "Utilisateur a bien été posté" 
        } catch (error) {
            throw new Error("Une erreur s'est produite au niveau de la création du compte");
        }
    }
}