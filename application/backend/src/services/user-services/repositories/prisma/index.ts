import { prisma } from "@config/prisma";
import { UsersRepository } from "@services/user-services/repositories";
import { IUser } from "@models/user";

export class PrismaUsersRepository implements UsersRepository {
    async createUser(data: IUser): Promise<IUser> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return user
    }
    
    async getUser(id: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: {id}
        }) 
        return user
    }
    
    async updateUser(id: string, data: IUser): Promise<IUser |  null> {
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