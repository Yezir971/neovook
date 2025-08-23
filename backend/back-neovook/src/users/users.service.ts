import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()

export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository :Repository<User>){

    }
    async getUsers(): Promise<User[]>{
        return await this.userRepository.find()
    }
    async getUser(name: string): Promise<User | null>{
        const user = await this.userRepository.findOneBy({['name'] : name})

        return user
    } 
    async getUserByEmail(email: string): Promise<User | null>{
        const user = await this.userRepository.findOneBy({['email'] : email})

        return user
    } 
    async createUser(user : User) : Promise<String>{
        try {
            const newUser = this.userRepository.create(user); 
            await this.userRepository.save(newUser);
            return "Utilisateur a bien été ajouter" 
        } catch (error) {
            console.error('Erreur création utilisateur:', error); 
            throw new Error("Une erreur s'est produite au niveau de la création du compte");
        }
    }
}