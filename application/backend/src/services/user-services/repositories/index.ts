import { IUser } from "@models/user"

export interface UsersRepository {
    createUser(data: IUser): Promise<IUser>
    getUser(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    updateUser(id: string, data: IUser): Promise<IUser | null>
    deleteUser(id: string | null): Promise<void>
}