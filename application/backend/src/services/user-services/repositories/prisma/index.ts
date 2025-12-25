import { prisma } from "@config/prisma";
import { UsersRepository } from "@services/user-services/repositories";
import { IUserCreateDTO, IUser, IUserResponseDTO  } from "@models/user";

export class PrismaUsersRepository implements UsersRepository {
    async createUser(data: IUserCreateDTO): Promise<IUserResponseDTO> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return user
    }
    
    async getUser(id: string): Promise<IUserResponseDTO | null> {
        const user = await prisma.user.findUnique({
            where: {id}
        }) 
        return user
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: {email}
        }) 
        return user
    }
    
    async updateUser(id: string, data: IUser): Promise<IUserResponseDTO |  null> {
        const user = await prisma.user.update({
            where: {id},
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return user
    }

    async deleteUser(id: string): Promise<void> {
        await prisma.user.delete({
            where: {id}
        }) 
    }

}